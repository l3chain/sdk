export type TransactionHead = {
  transactionHeads: {
    sourceChain: string;
    sourceTransactionHash: string;
    sourceTransactionDataHash: string;
    blockTransactionRootHash: string;
    blockHash: string,
  }[]
}

export const getTransactionHead = (sourceChain: string, sourceTransactionHash: string, sourceTransactionDataHash: string) => `
{
    transactionHeads(where: {sourceChain: "${sourceChain}", sourceTransactionHash: "${sourceTransactionHash}", sourceTransactionDataHash: "${sourceTransactionDataHash}"}) {
      sourceChain
      sourceTransactionDataHash
      sourceTransactionHash
      blockTransactionRootHash
      blockHash
    }
}
`;

export const getTransactionHeads = (sourceChain: string, sourceTransactionHash: string) => `
{
    transactionHeads(where: {sourceChain: "${sourceChain}", sourceTransactionHash: "${sourceTransactionHash}"}) {
      sourceChain
      sourceTransactionDataHash
      sourceTransactionHash
      blockTransactionRootHash
      blockHash
    }
}
`;