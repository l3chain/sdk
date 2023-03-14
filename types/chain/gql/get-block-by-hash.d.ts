import { BlockHead } from "../block";
import { TransactionHead } from "../transaction-head";
export type Block = {
    block: BlockHead & {
        epoch: number;
        time: string;
    };
    transactionHeads: TransactionHead[];
};
export declare const getBlockByHash: (blockHash: string) => string;
