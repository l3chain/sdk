import { ChainIdentifier } from '../core';
export type TransactionHead = {
    sourceChain: ChainIdentifier;
    sourceTransactionHash: string;
    sourceTransactionDataHash: string;
};
export type TransactionHeadIndex = TransactionHead & {
    blockHash: string;
    blockNumber: number;
    epoch: number;
};
