import { AbiItem } from 'web3-utils';

const SyncChainABI = require("../../abi/SyncChain.json");
const HostChainABI = require("../../abi/HostChain.json");
const IChainABI = require("../../abi/IChain.json");

export default {
    IChain: IChainABI,
    SyncChain: SyncChainABI,
    HostChain: HostChainABI
} as {
    [key: string]: AbiItem[]
}