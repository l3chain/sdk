import BN = require('bn.js');
import Web3 from "web3";

import { ethers } from "ethers";
import { Contract } from 'web3-eth-contract';
import { ChainIdentifiers, ChainName, GraphQlClient, L3Provider, L3ProviderGroup } from "../core";
import { BlockHead } from "./block";
import { EpochConfig } from "./consensus";
import { TransactionProof } from "./transaction-proof";
import { TransactionHead, TransactionHeadIndex } from "./transaction-head";
import { Digester, DigesterKeccak256 } from "../digester";

import MerkleTree from "merkletreejs";
import * as GQL from './gql';
import CoreABI from "../abis";
import abis from "../abis";

class L3ChainComponent {
    private _web3: Web3;
    get web3(): Web3 {
        return this._web3;
    }

    private _chainContract: Contract;
    get contract(): Contract {
        return this._chainContract;
    }

    private _graphClient: GraphQlClient;
    get graphClient(): GraphQlClient {
        return this._graphClient;
    }

    static fromHost(provider: L3Provider) {
        return new L3ChainComponent(provider, true);
    }

    static fromSync(provider: L3Provider) {
        return new L3ChainComponent(provider, false);
    }

    private constructor(provider: L3Provider, isHost: boolean = false) {
        this._web3 = new Web3(provider.web3Provider);
        this._chainContract = new this._web3.eth.Contract(
            isHost ? CoreABI.HostChain : CoreABI.SyncChain,
            provider.contractAddress
        )
        this._graphClient = new GraphQlClient(
            new URL(provider.graphDataBaseHost)
        )
    }
}

export class L3Chain {

    private digester: Digester
    private components: { [key in ChainName]?: L3ChainComponent } = {};

    constructor(providers: L3ProviderGroup) {
        this.digester = new DigesterKeccak256();

        let keys = Object.keys(providers);
        for (let chainName of keys) {
            if (chainName == 'HOST') {
                this.components[chainName] = L3ChainComponent.fromHost(providers[chainName]);
            } else {
                // @ts-ignore
                this.components[chainName] = L3ChainComponent.fromSync(providers[chainName]);
            }
        }
    }

    getComponents(chainName: ChainName): L3ChainComponent {
        return this.components[chainName];
    }

    async getBlockNumber(onChain: ChainName = 'HOST') {
        return this.components[onChain]!.contract.methods.getBlockNumber().call();
    }

    async getBlockNumberAll() {
        let chainNames = Object.keys(this.components) as ChainName[];
        let blockNumbers: { [key in ChainName]?: number } = {}
        for (let chainName of chainNames) {
            blockNumbers[chainName] = await this.getBlockNumber(chainName);
        }
        return blockNumbers;
    }

    async getBlockHeadByHash(blockHash: string, onChain: ChainName = 'HOST'): Promise<BlockHead> {
        return this.components[onChain]!.contract.methods.getBlockHeadByHash(blockHash).call();
    }

    async getBlockHeadByNumber(blockNumber: number | string | BN, onChain: ChainName = 'HOST'): Promise<BlockHead> {
        return this.components[onChain]!.contract.methods.getBlockHeadByNumber(blockNumber).call();
    }

    async getEpochConfigAtIndex(epochIndex: number | string | BN, onChain: ChainName = 'HOST'): Promise<EpochConfig> {
        return this.components[onChain]!.contract.methods.getEpochConfigAtIndex(epochIndex).call();
    }

    async getBlockByNumber(blockNumber: number | string | BN): Promise<GQL.Block> {
        let block = await this.getBlockHeadByNumber(blockNumber);
        return this.getBlockByHash(block.hash);
    }

    async getBlockByHash(blockHash: string): Promise<GQL.Block> {
        return this.components.HOST!.graphClient.query<GQL.Block>(GQL.getBlockByHash(blockHash));
    }

    async getBlockProposeds(blockHash: string): Promise<GQL.BlockProposeds> {
        return this.components.HOST!.graphClient.query<GQL.BlockProposeds>(GQL.getBlockProposeds(blockHash));
    }

    async getTransactionHeads(fromChain: ChainName, transactionHash: string): Promise<TransactionHeadIndex[]> {
        return this.components.HOST!.graphClient.query<GQL.TransactionHead>(GQL.getTransactionHeads(
            ChainIdentifiers[fromChain],
            transactionHash
        )).then(rsp => rsp.transactionHeads);
    }

    async getTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHeadIndex> {
        return this.components.HOST!.graphClient.query<GQL.TransactionHead>(GQL.getTransactionHead(
            ChainIdentifiers[fromChain],
            transactionHash,
            sourceTransactionDataHash
        )).then(rsp => rsp.transactionHeads[0]);
    }

    async getL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof> {
        // 获取到L3交易发起网络的详细交易数据和日志数据
        let web3 = this.components[fromChain]!.web3;
        let sourceReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        let sentLog = web3.eth.abi.decodeLog(
            abis.IChain.find(item => item.name == 'SentL3Transaction').inputs!,
            sourceReceipt.logs[logIndex].data,
            sourceReceipt.logs[logIndex].topics.slice(1)
        );
        // 计算sourceTransactionDataHash
        let sourceTransactionDataHash = this.digester.sourceTransactionDataHash(
            sentLog.emiter,
            sentLog.value,
            sentLog.nonce,
            sentLog.datas
        )
        // 查询该交易的L3区块
        let headIndex = await this.getTransactionHead(fromChain, transactionHash, sourceTransactionDataHash);
        let block = await this.getBlockByHash(headIndex.blockHash);

        // MerkleRoot
        let leaves = block.transactionHeads.map(head => this.digester.transactionHeadHash(
            head.sourceChain, head.sourceTransactionHash, head.sourceTransactionDataHash
        ));

        // Leaf节点的数据必须是根据入参计算得出
        let leaf = this.digester.transactionHeadHash(
            ChainIdentifiers[fromChain], transactionHash, sourceTransactionDataHash
        )
        const tree = new MerkleTree(leaves, ethers.keccak256, { sort: true });

        // 验证Merkle头一致
        if (block.block.transactionMerkleRoot.toLocaleLowerCase() !== tree.getHexRoot().toLocaleLowerCase()) {
            throw `SourceNetowrk:"${fromChain}" Tx:"${transactionHash}" Merkle Verify Failed.`
        }

        let proof: TransactionProof = {
            blockHash: headIndex.blockHash,
            sourceChain: ChainIdentifiers[fromChain],
            sourceTransactionHash: transactionHash,
            emiter: sentLog.emiter,
            value: sentLog.value,
            nonce: sentLog.nonce,
            datas: sentLog.datas,
            merkleProofs: tree.getHexProof(leaf)
        }

        console.log(proof);

        return proof;
    }

    async verifyL3Transaction(proof: TransactionProof, onChain: ChainName): Promise<boolean> {
        return this.components[onChain]!.contract.methods.verifyL3Transaction(proof).call();
    }
}