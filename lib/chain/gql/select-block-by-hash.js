"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBlockByHash = void 0;
var selectBlockByHash = function (blockHash) { return "\n{\n  block(id:\"".concat(blockHash, "\") {\n    hash\n    number\n    time\n    transactionMerkleRoot\n    transactionRootHash\n    transactionHeads {\n      sourceChain\n      sourceTransactionDataHash\n      sourceTransactionHash\n    }\n  }\n  signatures:blockProposeds(where:{hash: \"").concat(blockHash, "\"}) {\n    signature,\n  }\n}\n"); };
exports.selectBlockByHash = selectBlockByHash;
