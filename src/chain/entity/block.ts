export interface BlockHead {
    hash: string;
    number: number
    time: number;
    transactionMerkleRoot: string;
    transactionRootHash: string;
}