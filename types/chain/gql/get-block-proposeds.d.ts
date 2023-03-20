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
        hash: string;
    }[];
};
export declare const getBlockProposedsByHash: (blockHash: string, onlyProposer?: string) => string;
export declare const getBlockProposedsByNumber: (blockNumber: number, onlyProposer?: string) => string;
