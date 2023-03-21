import BN = require('bn.js');
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { ChainName, GraphQlClient, L3Provider, L3ProviderGroup } from "../core";
import { BlockHead, EpochConfig, TransactionHead, TransactionHeadIndex, TransactionProof } from "./entity";
import * as GQL from './gql';
export declare class L3ChainComponent {
    private _web3;
    get web3(): Web3;
    private _chainContract;
    get contract(): Contract;
    private _graphClient;
    get graphClient(): GraphQlClient;
    private _chianName;
    get chainName(): ChainName;
    constructor(provider: L3Provider, chainName?: ChainName);
}
export declare class L3Chain {
    private digester;
    private components;
    constructor(providers: L3ProviderGroup);
    getChianNames(): ChainName[];
    getComponents(chainName: ChainName): L3ChainComponent;
    getBlockNumber(onChain?: ChainName): Promise<number>;
    getBlockNumberAll(): Promise<{
        HOST: number;
        ETH: number;
        BSC: number;
    }>;
    getBlockHeadByHash(blockHash: string, onChain?: ChainName): Promise<BlockHead>;
    getBlockHeadByNumber(blockNumber: number | string | BN, onChain?: ChainName): Promise<BlockHead>;
    getEpochConfigAtIndex(epochIndex: number, onChain?: ChainName): Promise<EpochConfig>;
    selectBlockByNumber(blockNumber: number): Promise<GQL.Block>;
    selectBlockByHash(blockHash: string): Promise<GQL.Block>;
    selectTransactionHeads(fromChain: ChainName, blockHash: string): Promise<TransactionHeadIndex[]>;
    selectTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHeadIndex>;
    createL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof>;
    verifyL3Transaction(proof: TransactionProof, onChain: ChainName): Promise<boolean>;
    isAgreedProposals(onChain: ChainName, blockNumbers: number[], blockHashs: string[], proposal: string): Promise<{
        blockNumber: number;
        blockHash: string;
        agreed: any;
    }[]>;
    getBlockTransactionBreakPoint(blockHash: string): Promise<TransactionHead>;
    /**
     * payabale方法,需要支付费用
     *
     * l3chain.epochUpdate
     *      .send({from:'0x....'})
     *      .on('transactionHash', (hash) => {...})
     *      .on('error',(err) => {...})
     *      .then((receipt) => {...})
     */
    epochUpdate: () => any;
    syncBlockHead: (onChain: ChainName, head: BlockHead[], sig: string[][]) => any;
}
