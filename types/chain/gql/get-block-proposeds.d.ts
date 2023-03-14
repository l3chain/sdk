import { BlockHead } from "../block";
export type BlockProposeds = {
    block: BlockHead & {
        epoch: number;
        time: number;
    };
    blockProposeds: {
        isVerifier: boolean;
        proposer: string;
        time: number;
        signature: string;
    }[];
};
export declare const getBlockProposeds: (blockHash: string) => string;
