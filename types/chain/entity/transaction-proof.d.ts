import BN = require('bn.js');
import { ChainIdentifier } from '../../core';
export interface TransactionProof {
    blockHash: string;
    sourceChain: ChainIdentifier;
    sourceTransactionHash: string;
    emiter: string;
    value: number | string | BN;
    nonce: number | string | BN;
    time: number | string | BN;
    datas: string;
    merkleProofs: string[];
}
