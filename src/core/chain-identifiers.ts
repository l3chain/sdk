export type ChainIdentifier = string;

export type ChainName = string;

export const ChainIdentifiers: { [key: ChainName]: ChainIdentifier } = {
    HOST: '0x0000000000000000000000000000000000000000000000000000000000000000'.toLowerCase(),
    // ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c'.toLowerCase(),
    BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'.toLowerCase()
}

export const ChainNames = Object.keys(ChainIdentifiers).map(k => k as ChainName);

export const ChainNameFromIdentifier = (identifier: string) => {
    let values = Object.values(ChainIdentifiers);
    let index = values.findIndex((v) => v === identifier.toLowerCase());
    if (index >= 0) {
        return Object.keys(ChainIdentifiers)[index];
    } else {
        throw new Error(`unregiste chain with identifier:${identifier}`);
    }
}

export const registerChain = (chainName: ChainName, chianIdentifier: ChainIdentifier) => {
    if (!ChainIdentifiers[chainName]) {
        ChainIdentifiers[chainName] = chianIdentifier.startsWith('0x')
            ? chianIdentifier.toLowerCase()
            : `0x${chianIdentifier.toLowerCase()}`;
    }
}