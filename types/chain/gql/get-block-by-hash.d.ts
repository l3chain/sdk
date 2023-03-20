import { BlockHead } from "../block";
import { TransactionHead } from "../transaction-head";
export type Block = {
    block: BlockHead & {
        epoch: number;
        time: string;
    };
    transactionHeads: TransactionHead[];
    signatures: {
        signature: string;
    }[];
};
export declare const getBlockByHash: (blockHash: string) => string;
