import { TransactionHeadIndex } from "../transaction-head";

export type TransactionHead = {
  transactionHeads: TransactionHeadIndex[]
}

export const getTransactionHead = (sourceChain: string, sourceTransactionHash: string, sourceTransactionDataHash: string) => `
{
    transactionHeads(where: {sourceChain: "${sourceChain}", sourceTransactionHash: "${sourceTransactionHash}", sourceTransactionDataHash: "${sourceTransactionDataHash}"}) {
      sourceChain
      sourceTransactionDataHash
      sourceTransactionHash
      blockHash
      blockNumber
      epoch
    }
}
`;

export const getTransactionHeads = (sourceChain: string, sourceTransactionHash: string) => `
{
    transactionHeads(where: {sourceChain: "${sourceChain}", sourceTransactionHash: "${sourceTransactionHash}"}) {
      sourceChain
      sourceTransactionDataHash
      sourceTransactionHash
      blockHash
      blockNumber
      epoch
    }
}
`;