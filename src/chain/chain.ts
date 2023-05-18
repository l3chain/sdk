import BN = require('bn.js');
import Web3 from "web3";

import { Contract } from 'web3-eth-contract';
import { ChainIdentifiers, ChainName, ChainNames, GraphQlClient, L3Provider, L3ProviderGroup, registerChain } from "../core";
import { BlockHead, EpochConfig, TransactionHead, TransactionHeadIndex, TransactionProof } from "./entity";
import { Digester, DigesterKeccak256, solidityKeccak256 } from "../digester";

import MerkleTree from "merkletreejs";
import * as GQL from './gql';
import CoreABI from "../abis";
import abis from "../abis";
import { toNumber } from 'web3-utils';

export class L3ChainComponent {
    private _web3: Web3;
    get web3(): Web3 {
        return this._web3;
    }

    private _chainContract: Contract;
    get contract(): Contract {
        return this._chainContract;
    }

    private _graphClient!: GraphQlClient;
    get graphClient(): GraphQlClient {
        return this._graphClient;
    }

    private _chianName: ChainName;
    get chainName() {
        return this._chianName;
    }

    constructor(provider: L3Provider, chainName: ChainName = "HOST") {
        if (!ChainNames.includes(chainName)) {
            registerChain(chainName, provider.chainIdentifier)
        }

        this._chianName = chainName;
        this._web3 = new Web3(provider.web3Provider);
        this._chainContract = new this._web3.eth.Contract(
            chainName == "HOST"
                ? CoreABI.HostChain
                : CoreABI.SyncChain,
            provider.contractAddress
        )

        if (chainName == 'HOST') {
            this._graphClient = new GraphQlClient(
                new URL(provider.graphDataBaseHost!)
            )
        }
    }
}

export class L3Chain {

    private digester: Digester
    private components: { [key in ChainName]?: L3ChainComponent } = {};

    constructor(providers: L3ProviderGroup) {
        this.digester = new DigesterKeccak256();
        let keys = Object.keys(providers) as ChainName[];
        for (let chainName of keys) {
            this.components[chainName] = new L3ChainComponent(providers[chainName], chainName);
        }
    }

    getChianNames(): ChainName[] {
        return Object.keys(this.components) as ChainName[];
    }

    getComponents(chainName: ChainName): L3ChainComponent {
        return this.components[chainName]!;
    }

    async getBlockNumber(onChain: ChainName = "HOST"): Promise<number> {
        return this.components[onChain]!.contract.methods.getBlockNumber().call().then(toNumber);
    }

    async getBlockNumberAll() {
        let blockNumbers: { [key in ChainName]?: number } = {}
        for (let name of ChainNames) {
            blockNumbers[name as ChainName] = await this.getBlockNumber(name as ChainName).catch(() => undefined);
        }
        return blockNumbers as { [key in ChainName]: number };
    }

    async getBlockHeadByHash(blockHash: string, onChain: ChainName = "HOST"): Promise<BlockHead> {
        return this.components[onChain]!.contract.methods.getBlockHeadByHash(blockHash).call()
            .then((rsp: any) => {
                return {
                    hash: rsp.hash,
                    number: toNumber(rsp.number),
                    time: toNumber(rsp.time),
                    transactionMerkleRoot: rsp.transactionMerkleRoot,
                    transactionRootHash: rsp.transactionRootHash,
                }
            });
    }

    async getBlockHeadByNumber(blockNumber: number | string | BN, onChain: ChainName = "HOST"): Promise<BlockHead> {
        return this.components[onChain]!.contract.methods.getBlockHeadByNumber(blockNumber).call()
            .then((rsp: any) => {
                return {
                    hash: rsp.hash,
                    number: toNumber(rsp.number),
                    time: toNumber(rsp.time),
                    transactionMerkleRoot: rsp.transactionMerkleRoot,
                    transactionRootHash: rsp.transactionRootHash,
                }
            });
    }

    async getEpochConfigAtIndex(epochIndex: number, onChain: ChainName = "HOST"): Promise<EpochConfig> {
        return this.components[onChain]!.contract.methods.getEpochConfigAtIndex(epochIndex).call().then((rsp: any) => {
            return {
                epochIndex: toNumber(rsp.epochIndex),
                verifiers: rsp.verifiers,
                reachConsensusRatio: toNumber(rsp.reachConsensusRatio),
                blockInterval: toNumber(rsp.blockInterval),
                blockSize: toNumber(rsp.blockSize),
            } as EpochConfig
        });
    }

    async selectBlockByNumber(blockNumber: number): Promise<GQL.Block> {
        let block = await this.getBlockHeadByNumber(blockNumber);
        return this.selectBlockByHash(block.hash);
    }

    async selectBlockByHash(blockHash: string): Promise<GQL.Block> {
        return this.components.HOST!.graphClient.query<GQL.Block>(GQL.selectBlockByHash(blockHash));
    }

    async selectTransactionHeads(fromChain: ChainName, blockHash: string): Promise<TransactionHeadIndex[]> {
        return this.components.HOST!.graphClient.query<GQL.TransactionHead>(GQL.getTransactionHeads(
            ChainIdentifiers[fromChain],
            blockHash
        )).then(rsp => rsp.transactionHeads);
    }

    async selectTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHeadIndex> {
        return this.components.HOST!.graphClient.query<GQL.TransactionHead>(GQL.getTransactionHead(
            ChainIdentifiers[fromChain],
            transactionHash,
            sourceTransactionDataHash
        )).then(rsp => rsp.transactionHeads[0]);
    }

    async createL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof> {
        // 获取到L3交易发起网络的详细交易数据和日志数据
        let web3 = this.components[fromChain]!.web3;
        let sourceReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        let sentLog = web3.eth.abi.decodeLog(
            abis.IChain.find(item => item.name == 'SentL3Transaction')!.inputs!,
            sourceReceipt.logs.find(log => log.logIndex == logIndex)!.data,
            sourceReceipt.logs.find(log => log.logIndex == logIndex)!.topics.slice(1),
        );
        // 计算sourceTransactionDataHash
        let sourceTransactionDataHash = this.digester.sourceTransactionDataHash(
            sentLog.emiter,
            sentLog.value,
            sentLog.nonce,
            sentLog.time,
            sentLog.datas
        )
        // 查询该交易的L3区块
        let headIndex = await this.selectTransactionHead(fromChain, transactionHash, sourceTransactionDataHash);
        let block = await this.selectBlockByHash(headIndex.blockHash);

        // MerkleRoot
        let leaves = block.block.transactionHeads.map(head => this.digester.transactionHeadHash(
            head.sourceChain, head.sourceTransactionHash, head.sourceTransactionDataHash
        ));

        // Leaf节点的数据必须是根据入参计算得出
        let leaf = this.digester.transactionHeadHash(
            ChainIdentifiers[fromChain], transactionHash, sourceTransactionDataHash
        )
        const tree = new MerkleTree(leaves, solidityKeccak256, { sort: true });

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
            time: sentLog.time,
            merkleProofs: tree.getHexProof(leaf)
        }

        return proof;
    }

    async verifyProof(proof: TransactionProof, onChain: ChainName): Promise<boolean> {
        return this.components[onChain]!.contract.methods.verify(proof).call();
    }

    async isAgreedProposals(onChain: ChainName, blockNumbers: number[], blockHashs: string[], proposal: string) {
        let result = await this.components[onChain]?.contract.methods.isAgreedProposals(
            blockNumbers,
            blockHashs,
            proposal
        ).call();

        return blockNumbers.map((blockNumber, index) => {
            return {
                blockNumber,
                blockHash: blockHashs[index],
                agreed: result[index]
            }
        })
    }

    async getBlockTransactionBreakPoint(blockHash: string): Promise<TransactionHead> {
        return this.components.HOST!.contract.methods.getBlockTransactionBreakPoint(blockHash).call();
    }

    /**
     * payabale方法,需要支付费用
     * 
     * l3chain.epochUpdate
     *      .send({from:'0x....'})
     *      .on('transactionHash', (hash) => {...})
     *      .on('error',(err) => {...})
     *      .then((receipt) => {...})
     */
    epochUpdate = () => this.components.HOST?.contract.methods.epochUpdate();

    syncBlockHead = (onChain: ChainName, head: BlockHead[], sig: string[][]) => this.components[onChain]?.contract.methods.syncBlockHead(
        head,
        sig
    );
}