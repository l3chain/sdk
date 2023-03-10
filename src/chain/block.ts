import BN = require('bn.js');
import { TransactionHead } from './transaction-head';

export interface BlockHead {
    hash: string;
    number: BN;
    transactionMerkleRoot: string;
    transactionRootHash: string;
}