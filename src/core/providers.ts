import { HttpProvider, WebsocketProvider, IpcProvider } from 'web3-core';
import { Chains, ChainName } from './chain-identifiers';

/**
 * 支持的每个网络中应有一个HostChain或者SyncChain的合约实例，这里使用Provider的附加数据的形式定义
 */
export type L3Provider = {
    web3Provider: (HttpProvider | WebsocketProvider | IpcProvider),
    contractAddress: string,
}

export type L3ProviderGroup = { graphDataBaseHost: string } &
    {
        [key in ChainName]?: L3Provider
    };