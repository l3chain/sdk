import BN = require('bn.js');
import { ChainIdentifier } from '../../core';

export interface TransactionProof {
    // 区块Hash
    blockHash: string;
    // 数据来源网络标识
    sourceChain: ChainIdentifier;
    // 触发来源网络对应的交易Hash
    sourceTransactionHash: string;
    // 数据发送来源地址
    emiter: string;
    // 随交易发送的来源网络主币数量
    value: number | string | BN;
    // emiter在syncChain中的nonce
    nonce: number | string | BN;
    // 发送时间
    time: number | string | BN;
    // 发送的需要验证的数据
    datas: string;
    // Merkle证明材料
    merkleProofs: string[]
}