"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SyncChainABI = require("../../abi/SyncChain.json");
var HostChainABI = require("../../abi/HostChain.json");
var IChainABI = require("../../abi/IChain.json");
exports.default = {
    IChain: IChainABI,
    SyncChain: SyncChainABI,
    HostChain: HostChainABI
};
