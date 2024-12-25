export type ChainIdentifier = string;
export type ChainName = string;

// 定义基础链的默认配置
const DEFAULT_CHAIN_IDENTIFIERS: Readonly<Record<ChainName, ChainIdentifier>> = {
    'HOST': '0x0000000000000000000000000000000000000000000000000000000000000000',
    'ETH': '0xc2e8f644f9552ee96d7e42879092234f30d7bdd58babf5345f2dd5eb2847ac4c',
    'BSC': '0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494'
} as const;

// 内部状态管理
const _state = {
    initialized: false,
    mapping: {} as Record<ChainName, ChainIdentifier>,
    get names(): ChainName[] {
        return Object.keys(this.mapping);
    },
    get identifiers(): ChainIdentifier[] {
        return Object.values(this.mapping);
    }
};

// 初始化函数
function initialize(config?: Record<ChainName, ChainIdentifier>): void {
    if (_state.initialized) {
        throw new Error('Chain identifiers already initialized');
    }
    _state.mapping = config ?? { ...DEFAULT_CHAIN_IDENTIFIERS };
    _state.initialized = true;
}

function registerChain(name: string, identifier: ChainIdentifier): void {
    if (!_state.initialized) {
        throw new Error('Chain identifiers not initialized');
    }
    if (name in _state.mapping) {
        throw new Error(`Chain already registered: ${name}`);
    }
    if (Object.values(_state.mapping).includes(identifier)) {
        throw new Error(`Identifier already registered: ${identifier}`);
    }
    _state.mapping[name] = identifier;
}

// 为了类型安全，添加一个内部的验证函数
function isValidChainName(name: string): name is ChainName {
    return name in _state.mapping;
}

// String 扩展
declare global {
    interface String {
        toIdentifier(this: ChainName): ChainIdentifier
    }
}

String.prototype.toIdentifier = function (this: string) {
    if (!isValidChainName(this)) {
        throw new Error(`Invalid chain name: ${this}`);
    }
    return _state.mapping[this];
};

// 工具函数
export const getChainIdentifier = (chainName: ChainName): ChainIdentifier | undefined => {
    return _state.mapping[chainName];
};

export const isKnownChain = (chainName: string): boolean => {
    return isValidChainName(chainName);
};

// 更新接口定义
export interface ChainRegistry {
    readonly current: Record<ChainName, ChainIdentifier>;
    register(name: string, identifier: ChainIdentifier): void;
}

// 导出
export const DefaultChainIdentifiers: ChainRegistry = {
    get current() {
        if (!_state.initialized) {
            throw new Error('Chain identifiers not initialized');
        }
        return { ..._state.mapping };
    },
    register: registerChain
};


// @deprecated 尽量排除从使用该方法，采用外部调用的代码来确定需要的配置
export const ChainNames: ChainName[] = _state.names;

// @deprecated 尽量排除从使用该方法，采用外部调用的代码来确定需要的配置
export const ChainIdentifiers: ChainIdentifier[] = _state.identifiers;

// 导出初始化函数和默认配置
export const initializeChains = initialize;
export const DEFAULT_CHAINS = DEFAULT_CHAIN_IDENTIFIERS;