import BN = require('bn.js');
import { ethers } from "ethers";
import { ChainIdentifier } from '../core';

export interface Digester {
    sourceTransactionDataHash(
        emiter: string,
        value: string | number | BN,
        nonce: string | number | BN,
        datas: string
    ): string;

    transactionHeadHash(
        sourceChain: ChainIdentifier,
        sourceTransactionHash: string,
        sourceTransactionDataHash: string
    ): string
}

export class DigesterKeccak256 implements Digester {
    sourceTransactionDataHash(emiter: string, value: string | number | BN, nonce: string | number | BN, datas: string): string {
        return ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'uint256', 'bytes'],
            [emiter.toString(), value.toString(), nonce.toString(), datas.toString()]
        )
    }

    transactionHeadHash(
        sourceChain: ChainIdentifier,
        sourceTransactionHash: string,
        sourceTransactionDataHash: string
    ): string {
        return ethers.solidityPackedKeccak256(
            ['bytes32', 'bytes32', 'bytes32'],
            [sourceChain, sourceTransactionHash, sourceTransactionDataHash]
        )
    }
}