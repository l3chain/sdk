export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    reachConsensusRatio: number;
    blockSize: number;
    blockInterval: number;
}

export const EpochBlockSize = 100;