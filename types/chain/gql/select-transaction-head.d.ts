export type TransactionHead = {
    transactionHeads: {
        sourceChain: string;
        sourceTransactionHash: string;
        sourceTransactionDataHash: string;
        blockTransactionRootHash: string;
        blockHash: string;
    }[];
};
export declare const getTransactionHead: (sourceChain: string, sourceTransactionHash: string, sourceTransactionDataHash: string) => string;
export declare const getTransactionHeads: (sourceChain: string, sourceTransactionHash: string) => string;
