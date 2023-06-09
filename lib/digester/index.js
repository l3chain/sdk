"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigesterKeccak256 = exports.solidityKeccak256 = exports.solidityPackedKeccak256 = void 0;
var web3_utils_1 = require("web3-utils");
var solidityPackedKeccak256 = function (solidityTypes, values) {
    var mixeds = solidityTypes.map(function (t, i) {
        return {
            t: t,
            v: values[i]
        };
    });
    return (0, web3_utils_1.keccak256)(web3_utils_1.encodePacked.apply(void 0, mixeds));
};
exports.solidityPackedKeccak256 = solidityPackedKeccak256;
exports.solidityKeccak256 = web3_utils_1.keccak256;
var DigesterKeccak256 = /** @class */ (function () {
    function DigesterKeccak256() {
    }
    DigesterKeccak256.prototype.sourceTransactionDataHash = function (emiter, value, nonce, time, datas) {
        return (0, exports.solidityPackedKeccak256)(['address', 'uint256', 'uint256', 'uint256', 'bytes'], [emiter.toString(), value.toString(), nonce.toString(), time.toString(), datas.toString()]);
    };
    DigesterKeccak256.prototype.transactionHeadHash = function (sourceChain, sourceTransactionHash, sourceTransactionDataHash) {
        return (0, exports.solidityPackedKeccak256)(['bytes32', 'bytes32', 'bytes32'], [sourceChain, sourceTransactionHash, sourceTransactionDataHash]);
    };
    return DigesterKeccak256;
}());
exports.DigesterKeccak256 = DigesterKeccak256;
