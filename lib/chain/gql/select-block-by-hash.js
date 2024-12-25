"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBlockByHash = exports.selectBlockByNumber = void 0;
var selectBlockByNumber = function (blockNumber) { return "\n{\n  block:blocks(where:{number: \"".concat(blockNumber, "\"}) {\n    hash\n    number\n    time\n    transactionMerkleRoot\n    transactionRootHash\n    transactionHeads {\n      sourceChain\n      sourceTransactionDataHash\n      sourceTransactionHash\n    }\n  }\n  signatures:blockProposeds(where:{number: \"").concat(blockNumber, "\"}) {\n    signature,\n  }\n}\n"); };
exports.selectBlockByNumber = selectBlockByNumber;
var selectBlockByHash = function (blockHash) { return "\n{\n  block(id:\"".concat(blockHash, "\") {\n    hash\n    number\n    time\n    transactionMerkleRoot\n    transactionRootHash\n    transactionHeads {\n      sourceChain\n      sourceTransactionDataHash\n      sourceTransactionHash\n    }\n  }\n  signatures:blockProposeds(where:{hash: \"").concat(blockHash, "\"}) {\n    signature,\n  }\n}\n"); };
exports.selectBlockByHash = selectBlockByHash;
