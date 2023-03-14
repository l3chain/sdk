import BN = require('bn.js');
import { ethers } from "ethers";
import { ChainIdentifier } from '../core';
export declare const solidityPackedKeccak256: typeof ethers.solidityPackedKeccak256;
export declare const solidityKeccak256: typeof ethers.keccak256;
export interface Digester {
    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, time: string | number | BN, datas: string): string;
    transactionHeadHash(sourceChain: ChainIdentifier, sourceTransactionHash: string, sourceTransactionDataHash: string): string;
}
export declare class DigesterKeccak256 implements Digester {
    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, time: string | number | BN, datas: string): string;
    transactionHeadHash(sourceChain: ChainIdentifier, sourceTransactionHash: string, sourceTransactionDataHash: string): string;
}
