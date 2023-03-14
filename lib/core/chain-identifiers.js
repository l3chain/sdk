"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainNameFromIdentifier = exports.ChainIdentifiers = void 0;
exports.ChainIdentifiers = {
    HOST: '0x0000000000000000000000000000000000000000000000000000000000000000',
    ETH: '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
    BSC: '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
};
var ChainNameFromIdentifier = function (identifier) {
    var names = Object.keys(exports.ChainIdentifiers);
    for (var i = 0; i < names.length; i++) {
        if (exports.ChainIdentifiers[names[i]].toLocaleLowerCase() == identifier.toLocaleLowerCase()) {
            return names[i];
        }
    }
};
exports.ChainNameFromIdentifier = ChainNameFromIdentifier;
