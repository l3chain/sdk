import BN = require('bn.js');

import { ChainIdentifier } from '../core';
import { encodePacked, keccak256 } from 'web3-utils';

export const solidityPackedKeccak256 = (solidityTypes: string[], values: (string | BN | number)[]) => {
    let mixeds = solidityTypes.map((t, i) => {
        return {
            t: t,
            v: values[i]
        }
    });

    return keccak256(encodePacked(
        ...mixeds
    )!);
}

export const solidityKeccak256 = keccak256;

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