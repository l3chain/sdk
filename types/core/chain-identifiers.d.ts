export type ChainIdentifier = string;
export type ChainName = "HOST" | "ETH" | "BSC";
export declare const ChainIdentifiers: {
    [key in ChainName]: ChainIdentifier;
};
export declare const ChainNames: ChainName[];
export declare const ChainNameFromIdentifier: (identifier: string) => string;
