import { BlockHead } from "../block";
import { TransactionHead } from "../transaction-head";

export type Block = {
  block: BlockHead & { epoch: number, time: string },
  transactionHeads: TransactionHead[]
  signatures: {
    signature: string
  }[]
}

export const getBlockByHash = (blockHash: string) => `
{
  block(id:"${blockHash}") {
    epoch
    hash
    number
    time
    transactionMerkleRoot
    transactionRootHash
  }
  transactionHeads(where: {blockHash: "${blockHash}"}) {
    sourceChain
    sourceTransactionDataHash
    sourceTransactionHash
  }
  signatures:blockProposeds(where:{hash: "${blockHash}", isVerifier:true}) {
    signature,
  }
}
`;