/// <reference types="node" />
import Web3 from "web3";
import BN = require('bn.js');
import { Contract } from 'web3-eth-contract';
import { ChainName, GraphQlClient, L3Provider, L3ProviderGroup } from "../core";
import { BlockHead, EpochConfig, TransactionHead, TransactionProof } from "./entity";
import * as GQL from './gql';
import EventEmitter = require("events");
type L3ProviderErrorEvent = {
    error: (error: any) => void;
};
export declare class L3ChainComponent extends EventEmitter {
    private _web3;
    get web3(): Web3;
    private _chainContract;
    get contract(): Contract;
    private _chianName;
    get chainName(): string;
    private _provider;
    constructor(provider: L3Provider, chainName: ChainName);
    on<K extends keyof L3ProviderErrorEvent>(event: K, listener: L3ProviderErrorEvent[K]): this;
    emit<K extends keyof L3ProviderErrorEvent>(event: K, ...args: Parameters<L3ProviderErrorEvent[K]>): boolean;
}
export declare class L3Chain extends EventEmitter {
    private digester;
    private components;
    graphClient: GraphQlClient;
    constructor(group: L3ProviderGroup);
    on<K extends keyof L3ProviderErrorEvent>(event: K, listener: L3ProviderErrorEvent[K]): this;
    emit<K extends keyof L3ProviderErrorEvent>(event: K, ...args: Parameters<L3ProviderErrorEvent[K]>): boolean;
    isValidChainName(chainName: string): boolean;
    getChianNames(): ChainName[];
    getComponents(chainName: ChainName): L3ChainComponent;
    getBlockNumber(onChain: ChainName): Promise<number>;
    getBlockNumberAll(): Promise<Record<string, number | undefined>>;
    getBlockHeadByHash(blockHash: string, onChain: ChainName): Promise<BlockHead>;
    getBlockHeadByNumber(blockNumber: number | string | BN, onChain: ChainName): Promise<BlockHead>;
    getEpochConfigAtIndex(epochIndex: number, onChain: ChainName): Promise<EpochConfig>;
    selectBlockNumber(): Promise<number>;
    selectBlockByNumber(blockNumber: number): Promise<GQL.Block | undefined>;
    selectBlockByHash(blockHash: string): Promise<GQL.Block | undefined>;
    selectTransactionHeads(fromChain: ChainName, blockHash: string): Promise<TransactionHead[]>;
    selectTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHead>;
    verifyProof(proof: TransactionProof, onChain: ChainName): Promise<boolean>;
    createL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof>;
}
export {};
