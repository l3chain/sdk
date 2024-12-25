import Web3 from "web3";
import BN = require('bn.js');
import MerkleTree from "merkletreejs";

import { toNumber } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { Digester, DigesterKeccak256, solidityKeccak256 } from "../digester";
import { ChainIdentifier, ChainName, GraphQlClient, initializeChains, L3Provider, L3ProviderGroup } from "../core";
import { BlockHead, EpochConfig, TransactionHead, TransactionProof } from "./entity";

import * as GQL from './gql';
import * as CoreABI from "../abis";
import EventEmitter = require("events");

type L3ProviderErrorEvent = {
    error: (error: any) => void;
}

export class L3ChainComponent extends EventEmitter {
    private _web3: Web3;
    get web3(): Web3 {
        return this._web3;
    }

    private _chainContract: Contract;
    get contract(): Contract {
        return this._chainContract;
    }

    private _chianName: ChainName;
    get chainName() {
        return this._chianName;
    }

    private _provider: any;

    constructor(provider: L3Provider, chainName: ChainName) {
        super();

        this._chianName = chainName;

        if (typeof provider.web3Provider === 'string') {
            if (provider.web3Provider.startsWith('http')) {
                this._provider = new Web3.providers.HttpProvider(provider.web3Provider);
            } else {
                this._provider = new Web3.providers.WebsocketProvider(provider.web3Provider);
            }
        } else {
            this._provider = provider.web3Provider;
        }

        this._web3 = new Web3(this._provider);
        this._chainContract = new this._web3.eth.Contract(
            chainName == "HOST"
                ? CoreABI.HostChain
                : CoreABI.SyncChain,
            provider.contractAddress
        )

        this._provider.on('error', (error: any) => {
            this.emit('error', error);
        });
    }

    on<K extends keyof L3ProviderErrorEvent>(event: K, listener: L3ProviderErrorEvent[K]): this {
        return super.on(event, listener);
    }

    emit<K extends keyof L3ProviderErrorEvent>(event: K, ...args: Parameters<L3ProviderErrorEvent[K]>): boolean {
        return super.emit(event, ...args);
    }
}

export class L3Chain extends EventEmitter {

    private digester: Digester
    private components: Record<string, L3ChainComponent> = {};
    public graphClient: GraphQlClient;

    constructor(group: L3ProviderGroup) {
        super();
        this.graphClient = new GraphQlClient(group.graphDataBaseHost);
        this.digester = new DigesterKeccak256();

        if (!('HOST' in group.providers)) {
            throw new Error('HOST provider is required');
        }

        initializeChains(Object.keys(group.providers).reduce((acc, chainName) => {
            acc[chainName] = group.providers[chainName]!.chainIdentifier;
            return acc;
        }, {} as Record<ChainName, ChainIdentifier>));

        for (let chainName in group.providers) {
            if (group.providers[chainName]) {
                this.components[chainName] = new L3ChainComponent(group.providers[chainName]!, chainName);
                this.components[chainName]!.on('error', (error: any) => {
                    this.emit('error', `${chainName} provider error: ${error}`);
                });
            }
        }
    }

    on<K extends keyof L3ProviderErrorEvent>(event: K, listener: L3ProviderErrorEvent[K]): this {
        return super.on(event, listener);
    }

    emit<K extends keyof L3ProviderErrorEvent>(event: K, ...args: Parameters<L3ProviderErrorEvent[K]>): boolean {
        return super.emit(event, ...args);
    }

    isValidChainName(chainName: string): boolean {
        return chainName in this.components;
    }

    getChianNames(): ChainName[] {
        return Object.keys(this.components) as ChainName[];
    }

    getComponents(chainName: ChainName): L3ChainComponent {
        if (!this.isValidChainName(chainName)) {
            throw new Error(`Chain ${chainName} not found`);
        }
        return this.components[chainName]!;
    }

    getBlockNumber(onChain: ChainName): Promise<number> {
        if (!this.isValidChainName(onChain)) {
            return Promise.reject(`Chain ${onChain} not found`)
        }

        return new Promise<number>((resolve, reject) => this.components[onChain]!.contract.methods
            .getBlockNumber()
            .call()
            .then((rsp: number | string) => {
                return resolve(parseInt(rsp.toString()))
            })
            .catch((e: any) => {
                return reject(`Chain ${onChain} get block number failed: ${e}`)
            })
        )
    }

    getBlockNumberAll() {
        return new Promise<Record<ChainName, number | undefined>>((resolve, reject) => {
            Promise.all(
                this.getChianNames().map(onChain => {
                    return this.getBlockNumber(onChain)
                })
            ).then(rsp => {
                let blockNumbers: Record<ChainName, number | undefined> = {}
                for (let i = 0; i < this.getChianNames().length; i++) {
                    blockNumbers[this.getChianNames()[i]] = parseInt(rsp[i].toString())
                }
                return resolve(blockNumbers)
            }).catch(e => {
                return reject(e)
            })
        })
    }

    getBlockHeadByHash(blockHash: string, onChain: ChainName): Promise<BlockHead> {
        if (!this.isValidChainName(onChain)) {
            return Promise.reject(`Chain ${onChain} not found`)
        }

        return this.components[onChain]!.contract.methods.getBlockHeadByHash(blockHash).call()
            .then((rsp: any) => {
                return {
                    hash: rsp.hash,
                    number: toNumber(rsp.number),
                    time: toNumber(rsp.time),
                    transactionMerkleRoot: rsp.transactionMerkleRoot,
                    transactionRootHash: rsp.transactionRootHash,
                }
            })
            .catch((err: any) => {
                return Promise.reject(`Chain ${onChain} get block head by hash failed: ${err}`)
            })
    }

    getBlockHeadByNumber(blockNumber: number | string | BN, onChain: ChainName): Promise<BlockHead> {
        return this.components[onChain]!.contract.methods.getBlockHeadByNumber(blockNumber).call()
            .then((rsp: any) => {
                return {
                    hash: rsp.hash,
                    number: toNumber(rsp.number),
                    time: toNumber(rsp.time),
                    transactionMerkleRoot: rsp.transactionMerkleRoot,
                    transactionRootHash: rsp.transactionRootHash,
                }
            })
            .catch((err: any) => {
                return Promise.reject(`Chain ${onChain} get block head by hash failed: ${err}`)
            })
    }

    getEpochConfigAtIndex(epochIndex: number, onChain: ChainName): Promise<EpochConfig> {
        return this.components[onChain]!.contract.methods.getEpochConfigAtIndex(epochIndex).call()
            .then((rsp: any) => {
                return {
                    epochIndex: toNumber(rsp.epochIndex),
                    verifiers: rsp.verifiers,
                    reachConsensusRatio: toNumber(rsp.reachConsensusRatio),
                    blockInterval: toNumber(rsp.blockInterval),
                    blockSize: toNumber(rsp.blockSize),
                } as EpochConfig
            }).catch((err: any) => {
                return Promise.reject(`Chain ${onChain} get epoch config at index failed: ${err}`)
            })
    }

    selectBlockNumber(): Promise<number> {
        return this.graphClient.query(GQL.selectBlockNumber()).then(rsp => {
            return parseInt(rsp.blocks[0].number.toString())
        });
    }

    selectBlockByNumber(blockNumber: number): Promise<GQL.Block | undefined> {
        return this.graphClient.query(GQL.selectBlockByNumber(blockNumber)).then(rsp => {

            if (rsp.block.length == 0) {
                return undefined
            }
            const block = rsp.block[0]
            return {
                block: {
                    hash: block.hash as string,
                    number: parseInt(block.number.toString()),
                    time: parseInt(block.time.toString()),
                    transactionMerkleRoot: block.transactionMerkleRoot as string,
                    transactionRootHash: block.transactionRootHash as string,
                    transactionHeads: block.transactionHeads as TransactionHead[]
                },
                signatures: rsp.signatures as { signature: string }[]
            } as GQL.Block
        });
    }

    selectBlockByHash(blockHash: string): Promise<GQL.Block | undefined> {
        return this.graphClient.query(GQL.selectBlockByHash(blockHash)).then(rsp => {

            if (rsp.block === undefined) {
                return undefined;
            }

            return ({
                block: {
                    hash: rsp.block.hash as string,
                    number: parseInt(rsp.block.number.toString()),
                    time: parseInt(rsp.block.time.toString()),
                    transactionMerkleRoot: rsp.block.transactionMerkleRoot as string,
                    transactionRootHash: rsp.block.transactionRootHash as string,
                    transactionHeads: rsp.block.transactionHeads as TransactionHead[]
                },
                signatures: rsp.signatures as { signature: string }[]
            } as GQL.Block)
        });
    }

    selectTransactionHeads(fromChain: ChainName, blockHash: string): Promise<TransactionHead[]> {
        return this.graphClient.query(GQL.getTransactionHeads(
            fromChain.toIdentifier(),
            blockHash
        )).then(rsp => rsp.map((item: any) => ({
            sourceChain: item.sourceChain as string,
            blockHash: item.blockHash as string,
            sourceTransactionHash: item.sourceTransactionHash as string,
            sourceTransactionDataHash: item.sourceTransactionDataHash as string,
            blockTransactionRootHash: item.blockTransactionRootHash as string,
        } as TransactionHead)));
    }

    selectTransactionHead(fromChain: ChainName, transactionHash: string, sourceTransactionDataHash: string): Promise<TransactionHead> {
        return this.graphClient.query(GQL.getTransactionHead(
            fromChain.toIdentifier(),
            transactionHash,
            sourceTransactionDataHash
        )).then(rsp => {
            if (rsp.transactionHeads.length == 0) {
                return Promise.reject(`Chain ${fromChain} select transaction head failed`)
            }

            const head = rsp.transactionHeads[0];
            return {
                sourceChain: head.sourceChain as string,
                sourceTransactionHash: head.sourceTransactionHash as string,
                sourceTransactionDataHash: head.sourceTransactionDataHash as string,
                blockTransactionRootHash: head.blockTransactionRootHash as string,
                blockHash: head.blockHash as string,
            } as TransactionHead;
        });
    }

    verifyProof(proof: TransactionProof, onChain: ChainName): Promise<boolean> {
        if (!this.isValidChainName(onChain)) {
            return Promise.reject(`Chain ${onChain} not found`)
        }
        return this.components[onChain]!.contract.methods.verify(proof).call();
    }

    async createL3TransactionProof(fromChain: ChainName, transactionHash: string, logIndex: number): Promise<TransactionProof> {

        if (!this.isValidChainName(fromChain)) {
            return Promise.reject(`Chain ${fromChain} not found`)
        }

        // 获取到L3交易发起网络的详细交易数据和日志数据
        const web3 = this.components[fromChain]!.web3;
        const sourceReceipt = await web3.eth.getTransactionReceipt(transactionHash).catch();
        if (sourceReceipt === undefined) {
            return Promise.reject(`Chain ${fromChain} get transaction receipt failed`)
        }

        try {
            const sentLog = web3.eth.abi.decodeLog(
                CoreABI.IChain.find(item => item.name == 'SentL3Transaction')!.inputs!,
                sourceReceipt.logs.find(log => log.logIndex == logIndex)!.data,
                sourceReceipt.logs.find(log => log.logIndex == logIndex)!.topics.slice(1),
            );

            // 计算sourceTransactionDataHash
            const sourceTransactionDataHash = this.digester.sourceTransactionDataHash(
                sentLog.emiter,
                sentLog.value,
                sentLog.nonce,
                sentLog.time,
                sentLog.datas
            )
            // 查询该交易的L3区块
            const headIndex = await this.selectTransactionHead(fromChain, transactionHash, sourceTransactionDataHash).catch();
            if (headIndex === undefined) {
                return Promise.reject(`Chain ${fromChain} select transaction head failed`)
            }

            // 查询该L3区块的详细信息
            const block = await this.selectBlockByHash(headIndex.blockHash).catch();
            if (block === undefined) {
                return Promise.reject(`Chain ${fromChain} select block by hash failed`)
            }

            // MerkleRoot
            const leaves = block.block.transactionHeads.map(head => this.digester.transactionHeadHash(
                head.sourceChain, head.sourceTransactionHash, head.sourceTransactionDataHash
            ));

            // Leaf节点的数据必须是根据入参计算得出
            const leaf = this.digester.transactionHeadHash(
                fromChain.toIdentifier(),
                transactionHash,
                sourceTransactionDataHash
            )
            const tree = new MerkleTree(leaves, solidityKeccak256, { sort: true });

            // 验证Merkle头一致
            if (block.block.transactionMerkleRoot.toLowerCase() !== tree.getHexRoot().toLowerCase()) {
                throw `SourceNetowrk:"${fromChain}" Tx:"${transactionHash}" Merkle Verify Failed.`
            }

            const proof: TransactionProof = {
                blockHash: headIndex.blockHash,
                sourceChain: fromChain.toIdentifier(),
                sourceTransactionHash: transactionHash,
                emiter: sentLog.emiter,
                value: sentLog.value,
                nonce: sentLog.nonce,
                datas: sentLog.datas,
                time: sentLog.time,
                merkleProofs: tree.getHexProof(leaf)
            }

            return Promise.resolve(proof);

        } catch (e) {
            return Promise.reject(`Chain ${fromChain} create l3 transaction proof failed: ${e}`)
        }
    }
}