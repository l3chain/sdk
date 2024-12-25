"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CHAINS = exports.initializeChains = exports.ChainIdentifiers = exports.ChainNames = exports.DefaultChainIdentifiers = exports.isKnownChain = exports.getChainIdentifier = void 0;
// 定义基础链的默认配置
var DEFAULT_CHAIN_IDENTIFIERS = {
    'HOST': '0x0000000000000000000000000000000000000000000000000000000000000000',
    'ETH': '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
    'BSC': '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
};
// 内部状态管理
var _state = {
    initialized: false,
    mapping: {},
    get names() {
        return Object.keys(this.mapping);
    },
    get identifiers() {
        return Object.values(this.mapping);
    }
};
// 初始化函数
function initialize(config) {
    if (_state.initialized) {
        throw new Error('Chain identifiers already initialized');
    }
    _state.mapping = config !== null && config !== void 0 ? config : __assign({}, DEFAULT_CHAIN_IDENTIFIERS);
    _state.initialized = true;
}
function registerChain(name, identifier) {
    if (!_state.initialized) {
        throw new Error('Chain identifiers not initialized');
    }
    if (name in _state.mapping) {
        throw new Error("Chain already registered: ".concat(name));
    }
    if (Object.values(_state.mapping).includes(identifier)) {
        throw new Error("Identifier already registered: ".concat(identifier));
    }
    _state.mapping[name] = identifier;
}
// 为了类型安全，添加一个内部的验证函数
function isValidChainName(name) {
    return name in _state.mapping;
}
String.prototype.toIdentifier = function () {
    if (!isValidChainName(this)) {
        throw new Error("Invalid chain name: ".concat(this));
    }
    return _state.mapping[this];
};
// 工具函数
var getChainIdentifier = function (chainName) {
    return _state.mapping[chainName];
};
exports.getChainIdentifier = getChainIdentifier;
var isKnownChain = function (chainName) {
    return isValidChainName(chainName);
};
exports.isKnownChain = isKnownChain;
// 导出
exports.DefaultChainIdentifiers = {
    get current() {
        if (!_state.initialized) {
            throw new Error('Chain identifiers not initialized');
        }
        return __assign({}, _state.mapping);
    },
    register: registerChain
};
// @deprecated 尽量排除从使用该方法，采用外部调用的代码来确定需要的配置
exports.ChainNames = _state.names;
// @deprecated 尽量排除从使用该方法，采用外部调用的代码来确定需要的配置
exports.ChainIdentifiers = _state.identifiers;
// 导出初始化函数和默认配置
exports.initializeChains = initialize;
exports.DEFAULT_CHAINS = DEFAULT_CHAIN_IDENTIFIERS;
