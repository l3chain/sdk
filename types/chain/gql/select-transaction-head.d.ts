import { TransactionHeadIndex } from "../entity/transaction-head";
export type TransactionHead = {
    transactionHeads: TransactionHeadIndex[];
};
export declare const getTransactionHead: (sourceChain: string, sourceTransactionHash: string, sourceTransactionDataHash: string) => string;
export declare const getTransactionHeads: (sourceChain: string, sourceTransactionHash: string) => string;
