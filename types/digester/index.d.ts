import BN = require('bn.js');
import { ChainIdentifier } from '../core';
import { keccak256 } from 'web3-utils';
export declare const solidityPackedKeccak256: (solidityTypes: string[], values: (string | BN | number)[]) => string;
export declare const solidityKeccak256: typeof keccak256;
export interface Digester {
    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, time: string | number | BN, datas: string): string;
    transactionHeadHash(sourceChain: ChainIdentifier, sourceTransactionHash: string, sourceTransactionDataHash: string): string;
}
export declare class DigesterKeccak256 implements Digester {
    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, time: string | number | BN, datas: string): string;
    transactionHeadHash(sourceChain: ChainIdentifier, sourceTransactionHash: string, sourceTransactionDataHash: string): string;
}
