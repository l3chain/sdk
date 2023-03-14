"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SyncChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/SyncChain.json").abi;
var HostChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/HostChain.json").abi;
var IChainABI = require("@cross_transaction_verify_system/contracts/build/contracts/ICHain.json").abi;
exports.default = {
    IChain: IChainABI,
    SyncChain: SyncChainABI,
    HostChain: HostChainABI
};
