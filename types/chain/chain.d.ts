import BN = require('bn.js');
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { ChainName, GraphQlClient, L3Provider, L3ProviderGroup } from "../core";
import { BlockHead } from "./block";
import { EpochConfig } from "./consensus";
import { TransactionProof } from "./transaction-proof";
import { TransactionHeadIndex } from "./transaction-head";
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
    getBlockNumber(onChain?: ChainName): Promise<any>;
    getBlockNumberAll(): Promise<{
        HOST?: number | undefined;
        ETH?: number | undefined;
        BSC?: number | undefined;
    }>;
    getBlockHeadByHash(blockHash: string, onChain?: ChainName): Promise<BlockHead>;
    getBlockHeadByNumber(blockNumber: number | string | BN, onChain?: ChainName): Promise<BlockHead>;
    getEpochConfigAtIndex(epochIndex: number | string | BN, onChain?: ChainName): Promise<EpochConfig>;
    getBlockByNumber(blockNumber: number | string | BN): Promise<GQL.Block>;
    getBlockByHash(blockHash: string): Promise<GQL.Block>;
    getBlockProposeds(blockHash: string): Promise<GQL.BlockProposeds>;
    getTransactionHeads(fromChain: ChainName, transactionHash: string): Promise<TransactionHeadIndex[]>;
    getTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHeadIndex>;
    getL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof>;
    verifyL3Transaction(proof: TransactionProof, onChain: ChainName): Promise<boolean>;
}
