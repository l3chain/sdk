"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chains = void 0;
exports.Chains = {
    "HOST": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "ETH": "0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c",
    "BSC": "0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494"
};
String.prototype.toIdentifier = function () {
    return {
        HOST: '0x0000000000000000000000000000000000000000000000000000000000000000',
        ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
        BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
    }[this];
};
// const ChainIdentifiers: Record<ChainNames, ChainIdentifier> = {
//     HOST: '0x0000000000000000000000000000000000000000000000000000000000000000',
//     ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
//     BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
// }
// export const ChainNames: ChainName[] = ['HOST', 'ETH', 'BSC']
// export const ChainIdentifiers: { [key in ChainName]: ChainIdentifier } = {
//     HOST: '0x0000000000000000000000000000000000000000000000000000000000000000',
//     ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
//     BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
// }
// export const ChainNameFromIdentifier = (identifier: ChainIdentifier) => {
//     let values = Object.values(ChainIdentifiers);
//     let index = values.findIndex((v) => v === identifier.toLowerCase());
//     if (index >= 0) {
//         return Object.keys(ChainIdentifiers)[index];
//     } else {
//         throw new Error(`unregiste chain with identifier:${identifier}`);
//     }
// }
// declare global {
//     interface String {
//         toChianName(): ChainName;
//         toChianIdentifier(): ChainIdentifier;
//     }
// }
// String.prototype.toChianName = () => {
//     return ({
//         '0x0000000000000000000000000000000000000000000000000000000000000000': 'HOST',
//         '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c': 'ETH',
//         '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494': 'BSC'
//     } as { [key in ChainIdentifier]: ChainName })[this as unknown as ChainIdentifier];
// }
// String.prototype.toChianIdentifier = () => {
//     return "0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c"
// }
