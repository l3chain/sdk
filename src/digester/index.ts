import BN = require('bn.js');
import { ethers } from "ethers";
import { ChainIdentifier } from '../core';

export const solidityPackedKeccak256 = ethers.solidityPackedKeccak256;
export const solidityKeccak256 = ethers.keccak256;

export interface Digester {
    sourceTransactionDataHash(
        emiter: string,
        value: string | number | BN,
        nonce: string | number | BN,
        time: string | number | BN,
        datas: string
    ): string;

    transactionHeadHash(
        sourceChain: ChainIdentifier,
        sourceTransactionHash: string,
        sourceTransactionDataHash: string
    ): string
}

export class DigesterKeccak256 implements Digester {

    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, time: string | number | BN, datas: string): string {
        return solidityPackedKeccak256(
            ['address', 'uint256', 'uint256', 'uint256', 'bytes'],
            [emiter.toString(), value.toString(), nonce.toString(), time.toString(), datas.toString()]
        )
    }

    transactionHeadHash(
        sourceChain: ChainIdentifier,
        sourceTransactionHash: string,
        sourceTransactionDataHash: string
    ): string {
        return solidityPackedKeccak256(
            ['bytes32', 'bytes32', 'bytes32'],
            [sourceChain, sourceTransactionHash, sourceTransactionDataHash]
        )
    }
}