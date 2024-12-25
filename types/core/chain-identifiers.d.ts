export type ChainIdentifier = string;
export type ChainName = string;
declare function initialize(config?: Record<ChainName, ChainIdentifier>): void;
declare global {
    interface String {
        toIdentifier(this: ChainName): ChainIdentifier;
    }
}
export declare const getChainIdentifier: (chainName: ChainName) => ChainIdentifier | undefined;
export declare const isKnownChain: (chainName: string) => boolean;
export interface ChainRegistry {
    readonly current: Record<ChainName, ChainIdentifier>;
    register(name: string, identifier: ChainIdentifier): void;
}
export declare const DefaultChainIdentifiers: ChainRegistry;
export declare const ChainNames: ChainName[];
export declare const ChainIdentifiers: ChainIdentifier[];
export declare const initializeChains: typeof initialize;
export declare const DEFAULT_CHAINS: Readonly<Record<string, string>>;
export {};
