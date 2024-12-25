import { ChainIdentifier } from '../../core';
export type TransactionHead = {
    sourceChain: ChainIdentifier;
    sourceTransactionHash: string;
    sourceTransactionDataHash: string;
    blockHash: string;
};
