export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    reachConsensusRatio: number;
    blockSize: number
}

export const EpochBlockSize = 10;