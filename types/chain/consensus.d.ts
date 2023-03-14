export interface EpochConfig {
    epochIndex: number;
    verifiers: string[];
    uncles: string[];
    verifierWeight: number;
    uncleWeight: number;
    reachConsensusRatio: number;
    transactionLimit: number;
}
