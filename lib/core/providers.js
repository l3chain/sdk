"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.L3ProvidersLocalHost = void 0;
var web3_1 = __importDefault(require("web3"));
exports.L3ProvidersLocalHost = {
    HOST: {
        web3Provider: new web3_1.default.providers.HttpProvider('http://127.0.0.1:18545'),
        contractAddress: "0xbc7F5429B89F570a68001340219188507f73a055",
        graphDataBaseHost: "http://127.0.0.1:18000/subgraphs/name/l3chain/host_database",
    },
    ETH: {
        web3Provider: new web3_1.default.providers.HttpProvider('http://127.0.0.1:28545'),
        contractAddress: "0xbc7F5429B89F570a68001340219188507f73a055",
        graphDataBaseHost: "http://127.0.0.1:18000/subgraphs/name/l3chain/sync_database",
    },
    BSC: {
        web3Provider: new web3_1.default.providers.HttpProvider('http://127.0.0.1:38545'),
        contractAddress: "0xbc7F5429B89F570a68001340219188507f73a055",
        graphDataBaseHost: "http://127.0.0.1:28000/subgraphs/name/l3chain/sync_database",
    },
};
