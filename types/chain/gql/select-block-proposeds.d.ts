import { BlockHead } from "../entity/block";
import { TransactionHead } from "../entity/transaction-head";
export type BlockProposeds = {
    block: BlockHead & {
        epoch: number;
        time: string;
        transactionHeads: TransactionHead[];
    };
    blockProposeds: {
        isVerifier: boolean;
        proposer: string;
        time: number;
        signature: string;
        hash: string;
    }[];
};
export declare const selectBlockProposedsByHash: (blockHash: string, onlyProposer?: string) => string;
export declare const selectBlockProposedsByNumber: (blockNumber: number, onlyProposer?: string) => string;
