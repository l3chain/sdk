import Web3 from 'web3';
import { HttpProvider, WebsocketProvider, IpcProvider } from 'web3-core';
import { ChainName } from './chain-identifiers';

/**
 * 支持的每个网络中应有一个HostChain或者SyncChain的合约实例，这里使用Provider的附加数据的形式定义
 */
export type L3Provider = {
    web3Provider: (HttpProvider | WebsocketProvider | IpcProvider),
    contractAddress: string,
    graphDataBaseHost?: string,
}

export type L3ProviderGroup = {
    [key in ChainName]: L3Provider
};

export const L3ProvidersLocalHost: L3ProviderGroup = {
    HOST: {
        web3Provider: new Web3.providers.HttpProvider('http://127.0.0.1:18545'),
        contractAddress: "0xf135b82D34058aE35d3c537a2EfB83462d4ee76e",
        graphDataBaseHost: "http://127.0.0.1:8000/subgraphs/name/l3chain/host_database",
    },
    ETH: {
        web3Provider: new Web3.providers.HttpProvider('http://127.0.0.1:28545'),
        contractAddress: "0xf135b82D34058aE35d3c537a2EfB83462d4ee76e",
    },
    BSC: {
        web3Provider: new Web3.providers.HttpProvider('http://127.0.0.1:38545'),
        contractAddress: "0xf135b82D34058aE35d3c537a2EfB83462d4ee76e",
    },
}