import { BlockHead } from "../entity/block";
import { TransactionHead } from "../entity/transaction-head";

export type Block = {
  block: BlockHead & { transactionHeads: TransactionHead[] },
  signatures: {
    signature: string
  }[]
}

export const selectBlockByNumber = (blockNumber: number) => `
{
  block:blocks(where:{number: "${blockNumber}"}) {
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
  signatures:blockProposeds(where:{number: "${blockNumber}"}) {
    signature,
  }
}
`;

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