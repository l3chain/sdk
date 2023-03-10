import { AbiItem } from 'web3-utils';

const SyncChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/SyncChain.json").abi;
const HostChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/HostChain.json").abi;
const IChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/ICHain.json").abi;

export default {
    IChain: IChainABI,
    SyncChain: SyncChainABI,
    HostChain: HostChainABI
} as {
    [key: string]: AbiItem[]
}