import BN = require('bn.js');
export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    uncles: string[];
    verifierWeight: number;
    uncleWeight: number;
    reachConsensusRatio: number;
    blockSize: number | string | BN;
    baseFee: number | string | BN;
    bytePrice: number | string | BN;
}
export declare const EpochBlockSize = 10;
