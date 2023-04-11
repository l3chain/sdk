"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChain = exports.ChainNameFromIdentifier = exports.ChainNames = exports.ChainIdentifiers = void 0;
exports.ChainIdentifiers = {
    HOST: '0x0000000000000000000000000000000000000000000000000000000000000000'.toLowerCase(),
    // ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c'.toLowerCase(),
    BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'.toLowerCase()
};
exports.ChainNames = Object.keys(exports.ChainIdentifiers).map(function (k) { return k; });
var ChainNameFromIdentifier = function (identifier) {
    var values = Object.values(exports.ChainIdentifiers);
    var index = values.findIndex(function (v) { return v === identifier.toLowerCase(); });
    if (index >= 0) {
        return Object.keys(exports.ChainIdentifiers)[index];
    }
    else {
        throw new Error("unregiste chain with identifier:".concat(identifier));
    }
};
exports.ChainNameFromIdentifier = ChainNameFromIdentifier;
var registerChain = function (chainName, chianIdentifier) {
    if (!exports.ChainIdentifiers[chainName]) {
        exports.ChainIdentifiers[chainName] = chianIdentifier.startsWith('0x')
            ? chianIdentifier.toLowerCase()
            : "0x".concat(chianIdentifier.toLowerCase());
    }
};
exports.registerChain = registerChain;
