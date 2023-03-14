"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockProposeds = void 0;
var getBlockProposeds = function (blockHash) { return "\n{\n  block(id:\"".concat(blockHash, "\") {\n    epoch\n    hash\n    number\n    time\n    transactionMerkleRoot\n    transactionRootHash\n  }\n  blockProposeds(where: {hash: \"").concat(blockHash, "\"}) {\n    time\n    signature\n    proposer\n    isVerifier\n  }\n}\n"); };
exports.getBlockProposeds = getBlockProposeds;
