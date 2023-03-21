"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHeads = exports.getTransactionHead = void 0;
var getTransactionHead = function (sourceChain, sourceTransactionHash, sourceTransactionDataHash) { return "\n{\n    transactionHeads(where: {sourceChain: \"".concat(sourceChain, "\", sourceTransactionHash: \"").concat(sourceTransactionHash, "\", sourceTransactionDataHash: \"").concat(sourceTransactionDataHash, "\"}) {\n      sourceChain\n      sourceTransactionDataHash\n      sourceTransactionHash\n      blockHash\n    }\n}\n"); };
exports.getTransactionHead = getTransactionHead;
var getTransactionHeads = function (sourceChain, sourceTransactionHash) { return "\n{\n    transactionHeads(where: {sourceChain: \"".concat(sourceChain, "\", sourceTransactionHash: \"").concat(sourceTransactionHash, "\"}) {\n      sourceChain\n      sourceTransactionDataHash\n      sourceTransactionHash\n      blockHash\n      blockNumber\n      epoch\n    }\n}\n"); };
exports.getTransactionHeads = getTransactionHeads;
