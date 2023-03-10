export type ChainIdentifier = string;
export type ChainName = "HOST" | "ETH" | "BSC"

export const ChainIdentifiers: { [key in ChainName]: ChainIdentifier } = {
    HOST: '0x0000000000000000000000000000000000000000000000000000000000000000',
    ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
    BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
}

export const ChainNameFromIdentifier = (identifier: string) => {
    let names = Object.keys(ChainIdentifiers);
    for (let i = 0; i < names.length; i++) {
        if (ChainIdentifiers[names[i] as ChainName].toLocaleLowerCase() == identifier.toLocaleLowerCase()) {
            return names[i] as ChainName
        }
    }
}