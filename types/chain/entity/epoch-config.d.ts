export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    reachConsensusRatio: number;
    blockSize: number;
}
export declare const EpochBlockSize = 10;
