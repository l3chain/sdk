"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBlockProposedsByNumber = exports.selectBlockProposedsByHash = void 0;
var selectBlockProposedsByHash = function (blockHash, onlyProposer) {
    return !onlyProposer
        ? "{\n      block(id:\"".concat(blockHash, "\") {\n        hash\n        number\n        time\n        transactionMerkleRoot\n        transactionRootHash\n      }\n      blockProposeds(where: {hash: \"").concat(blockHash, "\"}) {\n        time\n        signature\n        proposer\n        isVerifier\n      }\n    }")
        : "{\n      block(id:\"".concat(blockHash, "\") {\n        hash\n        number\n        time\n        transactionMerkleRoot\n        transactionRootHash\n      }\n      blockProposeds(where: {hash: \"").concat(blockHash, "\", proposer:\"").concat(onlyProposer, "\"}) {\n        time\n        signature\n        proposer\n        hash\n      }\n    }\n    ");
};
exports.selectBlockProposedsByHash = selectBlockProposedsByHash;
var selectBlockProposedsByNumber = function (blockNumber, onlyProposer) {
    var gql = !onlyProposer
        ? "\n    {\n      block:blocks(where: {number:".concat(blockNumber, "}) {\n        epoch\n        hash\n        number\n        time\n        transactionMerkleRoot\n        transactionRootHash\n      }\n      blockProposeds(where: {number: ").concat(blockNumber, "}) {\n        time\n        signature\n        proposer\n        isVerifier\n        hash\n      }\n    }")
        : "\n    {\n      block:blocks(where: {number:".concat(blockNumber, "}) {\n        epoch\n        hash\n        number\n        time\n        transactionMerkleRoot\n        transactionRootHash\n      }\n      blockProposeds(where: {number: \"").concat(blockNumber, "\", proposer:\"").concat(onlyProposer, "\"}) {\n        time\n        signature\n        proposer\n        isVerifier\n        hash\n      }\n    }\n    ");
    return gql;
};
exports.selectBlockProposedsByNumber = selectBlockProposedsByNumber;
