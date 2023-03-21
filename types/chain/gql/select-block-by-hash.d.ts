import { BlockHead } from "../entity/block";
import { TransactionHead } from "../entity/transaction-head";
export type Block = {
    block: BlockHead & {
        epoch: number;
        time: string;
        transactionHeads: TransactionHead[];
    };
    signatures: {
        signature: string;
    }[];
};
export declare const selectBlockByHash: (blockHash: string) => string;
