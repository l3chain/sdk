"use strict";
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
var L3ChainComponent = /** @class */ (function () {
    function L3ChainComponent(graphDataBaseHost, provider, chainName) {
        if (chainName === void 0) { chainName = "HOST"; }
        this._chianName = chainName;
        this._web3 = new web3_1.default(provider.web3Provider);
        this._chainContract = new this._web3.eth.Contract(chainName == "HOST"
            ? CoreABI.HostChain
            : CoreABI.SyncChain, provider.contractAddress);
        if (chainName == 'HOST') {
            this._graphClient = new core_1.GraphQlClient(new URL(graphDataBaseHost));
        }
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
    Object.defineProperty(L3ChainComponent.prototype, "graphClient", {
        get: function () {
            return this._graphClient;
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
    return L3ChainComponent;
}());
exports.L3ChainComponent = L3ChainComponent;
var L3Chain = /** @class */ (function () {
    function L3Chain(group) {
        var _this = this;
        this.components = {};
        /**
         * payabale方法,需要支付费用
         *
         * l3chain.epochUpdate
         *      .send({from:'0x....'})
         *      .on('transactionHash', (hash) => {...})
         *      .on('error',(err) => {...})
         *      .then((receipt) => {...})
         */
        this.epochUpdate = function () { var _a; return (_a = _this.components.HOST) === null || _a === void 0 ? void 0 : _a.contract.methods.epochUpdate(); };
        this.syncBlockHead = function (onChain, head, sig) {
            var _a;
            return (_a = _this.components[onChain]) === null || _a === void 0 ? void 0 : _a.contract.methods.syncBlockHead(head, sig);
        };
        this.digester = new digester_1.DigesterKeccak256();
        for (var _i = 0, ChainNames_1 = core_1.ChainNames; _i < ChainNames_1.length; _i++) {
            var chainName = ChainNames_1[_i];
            if (group.providers[chainName]) {
                this.components[chainName] = new L3ChainComponent(group.graphDataBaseHost, group.providers[chainName], chainName);
            }
        }
    }
    L3Chain.prototype.getChianNames = function () {
        return Object.keys(this.components);
    };
    L3Chain.prototype.getComponents = function (chainName) {
        return this.components[chainName];
    };
    L3Chain.prototype.getBlockNumber = function (onChain) {
        if (onChain === void 0) { onChain = "HOST"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components[onChain].contract.methods.getBlockNumber().call().then(web3_utils_1.toNumber)];
            });
        });
    };
    L3Chain.prototype.getBlockNumberAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumbers, _i, _a, chainName, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        blockNumbers = {};
                        _i = 0, _a = this.getChianNames();
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        chainName = _a[_i];
                        _b = blockNumbers;
                        _c = chainName;
                        return [4 /*yield*/, this.getBlockNumber(chainName).catch(function () { return undefined; })];
                    case 2:
                        _b[_c] = _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, blockNumbers];
                }
            });
        });
    };
    L3Chain.prototype.getBlockHeadByHash = function (blockHash, onChain) {
        if (onChain === void 0) { onChain = "HOST"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components[onChain].contract.methods.getBlockHeadByHash(blockHash).call()
                        .then(function (rsp) {
                        return {
                            hash: rsp.hash,
                            number: (0, web3_utils_1.toNumber)(rsp.number),
                            time: (0, web3_utils_1.toNumber)(rsp.time),
                            transactionMerkleRoot: rsp.transactionMerkleRoot,
                            transactionRootHash: rsp.transactionRootHash,
                        };
                    })];
            });
        });
    };
    L3Chain.prototype.getBlockHeadByNumber = function (blockNumber, onChain) {
        if (onChain === void 0) { onChain = "HOST"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components[onChain].contract.methods.getBlockHeadByNumber(blockNumber).call()
                        .then(function (rsp) {
                        return {
                            hash: rsp.hash,
                            number: (0, web3_utils_1.toNumber)(rsp.number),
                            time: (0, web3_utils_1.toNumber)(rsp.time),
                            transactionMerkleRoot: rsp.transactionMerkleRoot,
                            transactionRootHash: rsp.transactionRootHash,
                        };
                    })];
            });
        });
    };
    L3Chain.prototype.getEpochConfigAtIndex = function (epochIndex, onChain) {
        if (onChain === void 0) { onChain = "HOST"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components[onChain].contract.methods.getEpochConfigAtIndex(epochIndex).call().then(function (rsp) {
                        return {
                            epochIndex: (0, web3_utils_1.toNumber)(rsp.epochIndex),
                            verifiers: rsp.verifiers,
                            reachConsensusRatio: (0, web3_utils_1.toNumber)(rsp.reachConsensusRatio),
                            blockInterval: (0, web3_utils_1.toNumber)(rsp.blockInterval),
                            blockSize: (0, web3_utils_1.toNumber)(rsp.blockSize),
                        };
                    })];
            });
        });
    };
    L3Chain.prototype.selectBlockByNumber = function (blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBlockHeadByNumber(blockNumber)];
                    case 1:
                        block = _a.sent();
                        return [2 /*return*/, this.selectBlockByHash(block.hash)];
                }
            });
        });
    };
    L3Chain.prototype.selectBlockByHash = function (blockHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components.HOST.graphClient.query(GQL.selectBlockByHash(blockHash))];
            });
        });
    };
    L3Chain.prototype.selectTransactionHeads = function (fromChain, blockHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components.HOST.graphClient.query(GQL.getTransactionHeads(fromChain.toIdentifier(), blockHash)).then(function (rsp) { return rsp.transactionHeads; })];
            });
        });
    };
    L3Chain.prototype.selectTransactionHead = function (fromChain, transactionHash, sourceTransactionDataHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components.HOST.graphClient.query(GQL.getTransactionHead(fromChain.toIdentifier(), transactionHash, sourceTransactionDataHash)).then(function (rsp) { return rsp.transactionHeads[0]; })];
            });
        });
    };
    L3Chain.prototype.createL3TransactionProof = function (fromChain, transactionHash, logIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var web3, sourceReceipt, sentLog, sourceTransactionDataHash, headIndex, block, leaves, leaf, tree, proof;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        web3 = this.components[fromChain].web3;
                        return [4 /*yield*/, web3.eth.getTransactionReceipt(transactionHash)];
                    case 1:
                        sourceReceipt = _a.sent();
                        sentLog = web3.eth.abi.decodeLog(CoreABI.IChain.find(function (item) { return item.name == 'SentL3Transaction'; }).inputs, sourceReceipt.logs.find(function (log) { return log.logIndex == logIndex; }).data, sourceReceipt.logs.find(function (log) { return log.logIndex == logIndex; }).topics.slice(1));
                        sourceTransactionDataHash = this.digester.sourceTransactionDataHash(sentLog.emiter, sentLog.value, sentLog.nonce, sentLog.time, sentLog.datas);
                        return [4 /*yield*/, this.selectTransactionHead(fromChain, transactionHash, sourceTransactionDataHash)];
                    case 2:
                        headIndex = _a.sent();
                        return [4 /*yield*/, this.selectBlockByHash(headIndex.blockHash)];
                    case 3:
                        block = _a.sent();
                        leaves = block.block.transactionHeads.map(function (head) { return _this.digester.transactionHeadHash(head.sourceChain, head.sourceTransactionHash, head.sourceTransactionDataHash); });
                        leaf = this.digester.transactionHeadHash(fromChain.toIdentifier(), transactionHash, sourceTransactionDataHash);
                        tree = new merkletreejs_1.default(leaves, digester_1.solidityKeccak256, { sort: true });
                        // 验证Merkle头一致
                        if (block.block.transactionMerkleRoot.toLocaleLowerCase() !== tree.getHexRoot().toLocaleLowerCase()) {
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
                        return [2 /*return*/, proof];
                }
            });
        });
    };
    L3Chain.prototype.verifyProof = function (proof, onChain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components[onChain].contract.methods.verify(proof).call()];
            });
        });
    };
    L3Chain.prototype.isAgreedProposals = function (onChain, blockNumbers, blockHashs, proposal) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.components[onChain]) === null || _a === void 0 ? void 0 : _a.contract.methods.isAgreedProposals(blockNumbers, blockHashs, proposal).call())];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, blockNumbers.map(function (blockNumber, index) {
                                return {
                                    blockNumber: blockNumber,
                                    blockHash: blockHashs[index],
                                    agreed: result[index]
                                };
                            })];
                }
            });
        });
    };
    L3Chain.prototype.getBlockTransactionBreakPoint = function (blockHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.components.HOST.contract.methods.getBlockTransactionBreakPoint(blockHash).call()];
            });
        });
    };
    return L3Chain;
}());
exports.L3Chain = L3Chain;
