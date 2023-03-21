import { BlockHead } from "../entity/block";
import { TransactionHead } from "../entity/transaction-head";

export type Block = {
  block: BlockHead & { epoch: number, time: string, transactionHeads: TransactionHead[] },
  signatures: {
    signature: string
  }[]
}

export const selectBlockByHash = (blockHash: string) => `
{
  block(id:"${blockHash}") {
    hash
    number
    time
    transactionMerkleRoot
    transactionRootHash
    transactionHeads {
      sourceChain
      sourceTransactionDataHash
      sourceTransactionHash
    }
  }
  signatures:blockProposeds(where:{hash: "${blockHash}"}) {
    signature,
  }
}
`;