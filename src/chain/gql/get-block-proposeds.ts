import { BlockHead } from "../block";

export type BlockProposeds = {
  block: BlockHead & { epoch: number, time: number },
  blockProposeds: { isVerifier: boolean, proposer: string, time: number, signature: string, hash: string }[]
}

export const getBlockProposedsByHash = (blockHash: string, onlyProposer?: string) =>
  !onlyProposer
    ? `{
      block(id:"${blockHash}") {
        epoch
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
        hash
      }
    }`
    : `{
      block(id:"${blockHash}") {
        epoch
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
        isVerifier
        hash
      }
    }
    `
  ;


export const getBlockProposedsByNumber = (blockNumber: number, onlyProposer?: string) => {
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
    ;
  return gql;
}