export type ChainIdentifier = string;
export type ChainName = string;
export declare const ChainIdentifiers: {
    [key: ChainName]: ChainIdentifier;
};
export declare const ChainNames: string[];
export declare const ChainNameFromIdentifier: (identifier: string) => string;
export declare const registerChain: (chainName: ChainName, chianIdentifier: ChainIdentifier) => void;
