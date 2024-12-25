"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.L3Chain = exports.L3ChainComponent = void 0;
var web3_1 = __importDefault(require("web3"));
var merkletreejs_1 = __importDefault(require("merkletreejs"));
var web3_utils_1 = require("web3-utils");
var digester_1 = require("../digester");
var core_1 = require("../core");
var GQL = __importStar(require("./gql"));
var CoreABI = __importStar(require("../abis"));
var EventEmitter = require("events");
var L3ChainComponent = /** @class */ (function (_super) {
    __extends(L3ChainComponent, _super);
    function L3ChainComponent(provider, chainName) {
        var _this = _super.call(this) || this;
        _this._chianName = chainName;
        if (typeof provider.web3Provider === 'string') {
            if (provider.web3Provider.startsWith('http')) {
                _this._provider = new web3_1.default.providers.HttpProvider(provider.web3Provider);
            }
            else {
                _this._provider = new web3_1.default.providers.WebsocketProvider(provider.web3Provider);
            }
        }
        else {
            _this._provider = provider.web3Provider;
        }
        _this._web3 = new web3_1.default(_this._provider);
        _this._chainContract = new _this._web3.eth.Contract(chainName == "HOST"
            ? CoreABI.HostChain
            : CoreABI.SyncChain, provider.contractAddress);
        _this._provider.on('error', function (error) {
            _this.emit('error', error);
        });
        return _this;
    }
    Object.defineProperty(L3ChainComponent.prototype, "web3", {
        get: function () {
            return this._web3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(L3ChainComponent.prototype, "contract", {
        get: function () {
            return this._chainContract;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(L3ChainComponent.prototype, "chainName", {
        get: function () {
            return this._chianName;
        },
        enumerable: false,
        configurable: true
    });
    L3ChainComponent.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    L3ChainComponent.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, __spreadArray([event], args, false));
    };
    return L3ChainComponent;
}(EventEmitter));
exports.L3ChainComponent = L3ChainComponent;
var L3Chain = /** @class */ (function (_super) {
    __extends(L3Chain, _super);
    function L3Chain(group) {
        var _this = _super.call(this) || this;
        _this.components = {};
        _this.graphClient = new core_1.GraphQlClient(group.graphDataBaseHost);
        _this.digester = new digester_1.DigesterKeccak256();
        if (!('HOST' in group.providers)) {
            throw new Error('HOST provider is required');
        }
        (0, core_1.initializeChains)(Object.keys(group.providers).reduce(function (acc, chainName) {
            acc[chainName] = group.providers[chainName].chainIdentifier;
            return acc;
        }, {}));
        var _loop_1 = function (chainName) {
            if (group.providers[chainName]) {
                this_1.components[chainName] = new L3ChainComponent(group.providers[chainName], chainName);
                this_1.components[chainName].on('error', function (error) {
                    _this.emit('error', "".concat(chainName, " provider error: ").concat(error));
                });
            }
        };
        var this_1 = this;
        for (var chainName in group.providers) {
            _loop_1(chainName);
        }
        return _this;
    }
    L3Chain.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    L3Chain.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, __spreadArray([event], args, false));
    };
    L3Chain.prototype.isValidChainName = function (chainName) {
        return chainName in this.components;
    };
    L3Chain.prototype.getChianNames = function () {
        return Object.keys(this.components);
    };
    L3Chain.prototype.getComponents = function (chainName) {
        if (!this.isValidChainName(chainName)) {
            throw new Error("Chain ".concat(chainName, " not found"));
        }
        return this.components[chainName];
    };
    L3Chain.prototype.getBlockNumber = function (onChain) {
        var _this = this;
        if (!this.isValidChainName(onChain)) {
            return Promise.reject("Chain ".concat(onChain, " not found"));
        }
        return new Promise(function (resolve, reject) { return _this.components[onChain].contract.methods
            .getBlockNumber()
            .call()
            .then(function (rsp) {
            return resolve(parseInt(rsp.toString()));
        })
            .catch(function (e) {
            return reject("Chain ".concat(onChain, " get block number failed: ").concat(e));
        }); });
    };
    L3Chain.prototype.getBlockNumberAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Promise.all(_this.getChianNames().map(function (onChain) {
                return _this.getBlockNumber(onChain);
            })).then(function (rsp) {
                var blockNumbers = {};
                for (var i = 0; i < _this.getChianNames().length; i++) {
                    blockNumbers[_this.getChianNames()[i]] = parseInt(rsp[i].toString());
                }
                return resolve(blockNumbers);
            }).catch(function (e) {
                return reject(e);
            });
        });
    };
    L3Chain.prototype.getBlockHeadByHash = function (blockHash, onChain) {
        if (!this.isValidChainName(onChain)) {
            return Promise.reject("Chain ".concat(onChain, " not found"));
        }
        return this.components[onChain].contract.methods.getBlockHeadByHash(blockHash).call()
            .then(function (rsp) {
            return {
                hash: rsp.hash,
                number: (0, web3_utils_1.toNumber)(rsp.number),
                time: (0, web3_utils_1.toNumber)(rsp.time),
                transactionMerkleRoot: rsp.transactionMerkleRoot,
                transactionRootHash: rsp.transactionRootHash,
            };
        })
            .catch(function (err) {
            return Promise.reject("Chain ".concat(onChain, " get block head by hash failed: ").concat(err));
        });
    };
    L3Chain.prototype.getBlockHeadByNumber = function (blockNumber, onChain) {
        return this.components[onChain].contract.methods.getBlockHeadByNumber(blockNumber).call()
            .then(function (rsp) {
            return {
                hash: rsp.hash,
                number: (0, web3_utils_1.toNumber)(rsp.number),
                time: (0, web3_utils_1.toNumber)(rsp.time),
                transactionMerkleRoot: rsp.transactionMerkleRoot,
                transactionRootHash: rsp.transactionRootHash,
            };
        })
            .catch(function (err) {
            return Promise.reject("Chain ".concat(onChain, " get block head by hash failed: ").concat(err));
        });
    };
    L3Chain.prototype.getEpochConfigAtIndex = function (epochIndex, onChain) {
        return this.components[onChain].contract.methods.getEpochConfigAtIndex(epochIndex).call()
            .then(function (rsp) {
            return {
                epochIndex: (0, web3_utils_1.toNumber)(rsp.epochIndex),
                verifiers: rsp.verifiers,
                reachConsensusRatio: (0, web3_utils_1.toNumber)(rsp.reachConsensusRatio),
                blockInterval: (0, web3_utils_1.toNumber)(rsp.blockInterval),
                blockSize: (0, web3_utils_1.toNumber)(rsp.blockSize),
            };
        }).catch(function (err) {
            return Promise.reject("Chain ".concat(onChain, " get epoch config at index failed: ").concat(err));
        });
    };
    L3Chain.prototype.selectBlockNumber = function () {
        return this.graphClient.query(GQL.selectBlockNumber()).then(function (rsp) {
            return parseInt(rsp.blocks[0].number.toString());
        });
    };
    L3Chain.prototype.selectBlockByNumber = function (blockNumber) {
        return this.graphClient.query(GQL.selectBlockByNumber(blockNumber)).then(function (rsp) {
            if (rsp.block.length == 0) {
                return undefined;
            }
            var block = rsp.block[0];
            return {
                block: {
                    hash: block.hash,
                    number: parseInt(block.number.toString()),
                    time: parseInt(block.time.toString()),
                    transactionMerkleRoot: block.transactionMerkleRoot,
                    transactionRootHash: block.transactionRootHash,
                    transactionHeads: block.transactionHeads
                },
                signatures: rsp.signatures
            };
        });
    };
    L3Chain.prototype.selectBlockByHash = function (blockHash) {
        return this.graphClient.query(GQL.selectBlockByHash(blockHash)).then(function (rsp) {
            if (rsp.block === undefined) {
                return undefined;
            }
            return {
                block: {
                    hash: rsp.block.hash,
                    number: parseInt(rsp.block.number.toString()),
                    time: parseInt(rsp.block.time.toString()),
                    transactionMerkleRoot: rsp.block.transactionMerkleRoot,
                    transactionRootHash: rsp.block.transactionRootHash,
                    transactionHeads: rsp.block.transactionHeads
                },
                signatures: rsp.signatures
            };
        });
    };
    L3Chain.prototype.selectTransactionHeads = function (fromChain, blockHash) {
        return this.graphClient.query(GQL.getTransactionHeads(fromChain.toIdentifier(), blockHash)).then(function (rsp) { return rsp.map(function (item) { return ({
            sourceChain: item.sourceChain,
            blockHash: item.blockHash,
            sourceTransactionHash: item.sourceTransactionHash,
            sourceTransactionDataHash: item.sourceTransactionDataHash,
            blockTransactionRootHash: item.blockTransactionRootHash,
        }); }); });
    };
    L3Chain.prototype.selectTransactionHead = function (fromChain, transactionHash, sourceTransactionDataHash) {
        return this.graphClient.query(GQL.getTransactionHead(fromChain.toIdentifier(), transactionHash, sourceTransactionDataHash)).then(function (rsp) {
            if (rsp.transactionHeads.length == 0) {
                return Promise.reject("Chain ".concat(fromChain, " select transaction head failed"));
            }
            var head = rsp.transactionHeads[0];
            return {
                sourceChain: head.sourceChain,
                sourceTransactionHash: head.sourceTransactionHash,
                sourceTransactionDataHash: head.sourceTransactionDataHash,
                blockTransactionRootHash: head.blockTransactionRootHash,
                blockHash: head.blockHash,
            };
        });
    };
    L3Chain.prototype.verifyProof = function (proof, onChain) {
        if (!this.isValidChainName(onChain)) {
            return Promise.reject("Chain ".concat(onChain, " not found"));
        }
        return this.components[onChain].contract.methods.verify(proof).call();
    };
    L3Chain.prototype.createL3TransactionProof = function (fromChain, transactionHash, logIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var web3, sourceReceipt, sentLog, sourceTransactionDataHash, headIndex, block, leaves, leaf, tree, proof, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isValidChainName(fromChain)) {
                            return [2 /*return*/, Promise.reject("Chain ".concat(fromChain, " not found"))];
                        }
                        web3 = this.components[fromChain].web3;
                        return [4 /*yield*/, web3.eth.getTransactionReceipt(transactionHash).catch()];
                    case 1:
                        sourceReceipt = _a.sent();
                        if (sourceReceipt === undefined) {
                            return [2 /*return*/, Promise.reject("Chain ".concat(fromChain, " get transaction receipt failed"))];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        sentLog = web3.eth.abi.decodeLog(CoreABI.IChain.find(function (item) { return item.name == 'SentL3Transaction'; }).inputs, sourceReceipt.logs.find(function (log) { return log.logIndex == logIndex; }).data, sourceReceipt.logs.find(function (log) { return log.logIndex == logIndex; }).topics.slice(1));
                        sourceTransactionDataHash = this.digester.sourceTransactionDataHash(sentLog.emiter, sentLog.value, sentLog.nonce, sentLog.time, sentLog.datas);
                        return [4 /*yield*/, this.selectTransactionHead(fromChain, transactionHash, sourceTransactionDataHash).catch()];
                    case 3:
                        headIndex = _a.sent();
                        if (headIndex === undefined) {
                            return [2 /*return*/, Promise.reject("Chain ".concat(fromChain, " select transaction head failed"))];
                        }
                        return [4 /*yield*/, this.selectBlockByHash(headIndex.blockHash).catch()];
                    case 4:
                        block = _a.sent();
                        if (block === undefined) {
                            return [2 /*return*/, Promise.reject("Chain ".concat(fromChain, " select block by hash failed"))];
                        }
                        leaves = block.block.transactionHeads.map(function (head) { return _this.digester.transactionHeadHash(head.sourceChain, head.sourceTransactionHash, head.sourceTransactionDataHash); });
                        leaf = this.digester.transactionHeadHash(fromChain.toIdentifier(), transactionHash, sourceTransactionDataHash);
                        tree = new merkletreejs_1.default(leaves, digester_1.solidityKeccak256, { sort: true });
                        // 验证Merkle头一致
                        if (block.block.transactionMerkleRoot.toLowerCase() !== tree.getHexRoot().toLowerCase()) {
                            throw "SourceNetowrk:\"".concat(fromChain, "\" Tx:\"").concat(transactionHash, "\" Merkle Verify Failed.");
                        }
                        proof = {
                            blockHash: headIndex.blockHash,
                            sourceChain: fromChain.toIdentifier(),
                            sourceTransactionHash: transactionHash,
                            emiter: sentLog.emiter,
                            value: sentLog.value,
                            nonce: sentLog.nonce,
                            datas: sentLog.datas,
                            time: sentLog.time,
                            merkleProofs: tree.getHexProof(leaf)
                        };
                        return [2 /*return*/, Promise.resolve(proof)];
                    case 5:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject("Chain ".concat(fromChain, " create l3 transaction proof failed: ").concat(e_1))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return L3Chain;
}(EventEmitter));
exports.L3Chain = L3Chain;
