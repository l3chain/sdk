"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockByHash = void 0;
var getBlockByHash = function (blockHash) { return "\n{\n  block(id:\"".concat(blockHash, "\") {\n    epoch\n    hash\n    number\n    time\n    transactionMerkleRoot\n    transactionRootHash\n  }\n  transactionHeads(where: {blockHash: \"").concat(blockHash, "\"}) {\n    sourceChain\n    sourceTransactionDataHash\n    sourceTransactionHash\n  }\n  signatures:blockProposeds(where:{hash: \"").concat(blockHash, "\", isVerifier:true}) {\n    signature,\n  }\n}\n"); };
exports.getBlockByHash = getBlockByHash;
