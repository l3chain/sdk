export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    reachConsensusRatio: number;
    blockSize: number;
    blockInterval: number;
}
export declare const EpochBlockSize = 100;
