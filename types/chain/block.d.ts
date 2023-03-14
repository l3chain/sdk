import BN = require('bn.js');
export interface BlockHead {
    hash: string;
    number: BN | number | string;
    time: number;
    transactionMerkleRoot: string;
    transactionRootHash: string;
}
