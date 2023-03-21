import { BlockHead } from "../entity/block";
import { TransactionHead } from "../entity/transaction-head";

export type BlockProposeds = {
  block: BlockHead & { epoch: number, time: string, transactionHeads: TransactionHead[] },
  blockProposeds: { isVerifier: boolean, proposer: string, time: number, signature: string, hash: string }[]
}

export const selectBlockProposedsByHash = (blockHash: string, onlyProposer?: string) =>
  !onlyProposer
    ? `{
      block(id:"${blockHash}") {
        hash
        number
        time
        transactionMerkleRoot
        transactionRootHash
      }
      blockProposeds(where: {hash: "${blockHash}"}) {
        time
        signature
        proposer
        isVerifier
      }
    }`
    : `{
      block(id:"${blockHash}") {
        hash
        number
        time
        transactionMerkleRoot
        transactionRootHash
      }
      blockProposeds(where: {hash: "${blockHash}", proposer:"${onlyProposer}"}) {
        time
        signature
        proposer
        hash
      }
    }
    `
  ;


export const selectBlockProposedsByNumber = (blockNumber: number, onlyProposer?: string) => {
  let gql = !onlyProposer
    ? `
    {
      block:blocks(where: {number:${blockNumber}}) {
        epoch
        hash
        number
        time
        transactionMerkleRoot
        transactionRootHash
      }
      blockProposeds(where: {number: ${blockNumber}}) {
        time
        signature
        proposer
        isVerifier
        hash
      }
    }`
    : `
    {
      block:blocks(where: {number:${blockNumber}}) {
        epoch
        hash
        number
        time
        transactionMerkleRoot
        transactionRootHash
      }
      blockProposeds(where: {number: "${blockNumber}", proposer:"${onlyProposer}"}) {
        time
        signature
        proposer
        isVerifier
        hash
      }
    }
    `
  return gql;
}