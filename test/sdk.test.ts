import { expect } from 'chai';
import { L3Chain, L3ChainComponent } from '../src/chain/chain';
import { ChainName, L3ProviderGroup } from '../src/core';
import { TransactionProof } from '../src/chain/entity';


describe('L3Chain SDK Tests', () => {
    let chain: L3Chain;
    let mockProviderGroup: L3ProviderGroup;

    let proof: TransactionProof;

    before(() => {
        // 使用已定义的模拟环境
        mockProviderGroup = {
            graphDataBaseHost: 'http://l3test.org:8000/subgraphs/name/l3chain/host_database',
            providers: {
                'HOST': {
                    web3Provider: 'http://l3test.org:8545/host',
                    contractAddress: '0xa000000000000000000000000000000000000000',
                    chainIdentifier: "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                'BSC': {
                    web3Provider: 'http://l3test.org:8545/bsc',
                    contractAddress: '0xa000000000000000000000000000000000000000',
                    chainIdentifier: "0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494"
                }
            }
        };
        chain = new L3Chain(mockProviderGroup);
    });

    it('should correctly initialize chain components', () => {
        expect(chain.getChianNames()).to.include('HOST');
        expect(chain.getChianNames()).to.include('BSC');
    });

    it('should correctly validate chain names', () => {
        expect(chain.isValidChainName('HOST')).to.be.true;
        expect(chain.isValidChainName('BSC')).to.be.true;
        expect(chain.isValidChainName('INVALID')).to.be.false;
    });

    it('should be able to get components for specified chain', () => {
        const hostComponent = chain.getComponents('HOST');
        const bscComponent = chain.getComponents('BSC');

        expect(hostComponent).to.be.instanceOf(L3ChainComponent);
        expect(bscComponent).to.be.instanceOf(L3ChainComponent);

        // 验证组件配置
        expect(hostComponent.chainName).to.equal('HOST');
        expect(bscComponent.chainName).to.equal('BSC');
    });

    it('should throw error when getting components for invalid chain', () => {
        expect(() => chain.getComponents('INVALID' as ChainName))
            .to.throw('Chain INVALID not found');
    });

    it('should be able to get block number', async () => {
        const hostBlockNumber = await chain.getBlockNumber('HOST');
        const bscBlockNumber = await chain.getBlockNumber('BSC');

        expect(hostBlockNumber).to.greaterThanOrEqual(0);
        expect(bscBlockNumber).to.greaterThanOrEqual(0);
    });

    it('should be able to get block numbers for all chains', async () => {
        const blockNumbers = await chain.getBlockNumberAll();
        expect(blockNumbers.HOST).to.greaterThanOrEqual(0);
        expect(blockNumbers.BSC).to.greaterThanOrEqual(0);
    });

    it('should be able to get block head by number', async () => {
        const blockHead = await chain.getBlockHeadByNumber(0, 'HOST');
        expect(blockHead).to.deep.include({
            number: 0
        });
    });

    it('should be able to get block head by hash', async () => {
        const genesisBlock = await chain.getBlockHeadByNumber(0, 'HOST');
        const blockHead = await chain.getBlockHeadByHash(genesisBlock.hash, 'HOST');
        expect(blockHead).to.deep.include({
            hash: genesisBlock.hash,
            number: genesisBlock.number,
            time: genesisBlock.time,
            transactionMerkleRoot: genesisBlock.transactionMerkleRoot,
            transactionRootHash: genesisBlock.transactionRootHash
        });
    });

    describe('Chain Select Methods Type Tests', () => {
        it('should return correct types for getBlockNumber', async () => {
            const blockNumber = await chain.getBlockNumber('HOST');
            expect(typeof blockNumber).to.equal('number');
            expect(Number.isInteger(blockNumber)).to.be.true;
        });

        it('should return correct types for getBlockNumberAll', async () => {
            const blockNumbers = await chain.getBlockNumberAll();

            expect(typeof blockNumbers.HOST).to.equal('number');
            expect(Number.isInteger(blockNumbers.HOST)).to.be.true;
            expect(typeof blockNumbers.BSC).to.equal('number');
            expect(Number.isInteger(blockNumbers.BSC)).to.be.true;
        });

        it('should return correct types for getBlockHeadByNumber', async () => {
            const blockHead = await chain.getBlockHeadByNumber(0, 'HOST');
            expect(typeof blockHead.number).to.equal('number');
            expect(Number.isInteger(blockHead.number)).to.be.true;
        });

        it('should return correct types for getBlockHeadByHash', async () => {
            const block0 = await chain.getBlockHeadByNumber(0, 'HOST');
            const blockHead = await chain.getBlockHeadByHash(block0.hash, 'HOST');
            expect(typeof blockHead.number).to.equal('number');
            expect(Number.isInteger(blockHead.number)).to.be.true;
        });

        it('should return correct types for getEpochConfigAtIndex', async () => {
            const epochConfig = await chain.getEpochConfigAtIndex(0, 'HOST');

            expect(typeof epochConfig.epochIndex).to.equal('number');
            expect(Number.isInteger(epochConfig.epochIndex)).to.be.true;

            expect(typeof epochConfig.verifiers).to.equal('object');
            expect(epochConfig.verifiers.length).to.be.greaterThan(0);

            expect(typeof epochConfig.reachConsensusRatio).to.equal('number');
            expect(Number.isInteger(epochConfig.reachConsensusRatio)).to.be.true;

            expect(typeof epochConfig.blockInterval).to.equal('number');
            expect(Number.isInteger(epochConfig.blockInterval)).to.be.true;

            expect(typeof epochConfig.blockSize).to.equal('number');
            expect(Number.isInteger(epochConfig.blockSize)).to.be.true;
        });

        it('should return correct types for selectBlockNumber', async () => {
            const blockNumber = await chain.selectBlockNumber();
            expect(typeof blockNumber).to.equal('number');
            expect(Number.isInteger(blockNumber)).to.be.true;
        });

        it('should return correct types for selectBlockByNumber', async () => {
            const blockHead = await chain.selectBlockByNumber(1);

            if (blockHead == undefined) {
                expect(blockHead).to.not.be.undefined;
                return
            }

            expect(typeof blockHead.block.number).to.equal('number');
            expect(Number.isInteger(blockHead.block.number)).to.be.true;

            expect(typeof blockHead.block.hash).to.equal('string');
            expect(blockHead.block.hash.startsWith('0x')).to.be.true;

            expect(typeof blockHead.block.time).to.equal('number');
            expect(Number.isInteger(blockHead.block.time)).to.be.true;

            expect(typeof blockHead.block.transactionMerkleRoot).to.equal('string');
            expect(blockHead.block.transactionMerkleRoot.startsWith('0x')).to.be.true;

            expect(typeof blockHead.block.transactionRootHash).to.equal('string');
            expect(blockHead.block.transactionRootHash.startsWith('0x')).to.be.true;
        });

        it('should return correct types for selectBlockByHash', async () => {
            const block1 = await chain.selectBlockByNumber(1);

            if (block1 == undefined) {
                expect(block1).to.not.be.undefined;
                return
            }

            const blockHead = await chain.selectBlockByHash(block1.block.hash);

            if (blockHead == undefined) {
                expect(blockHead).to.not.be.undefined;
                return
            }

            expect(typeof blockHead.block.number).to.equal('number');
            expect(Number.isInteger(blockHead.block.number)).to.be.true;

            expect(typeof blockHead.block.hash).to.equal('string');
            expect(blockHead.block.hash.startsWith('0x')).to.be.true;

            expect(typeof blockHead.block.time).to.equal('number');
            expect(Number.isInteger(blockHead.block.time)).to.be.true;

            expect(typeof blockHead.block.transactionMerkleRoot).to.equal('string');
            expect(blockHead.block.transactionMerkleRoot.startsWith('0x')).to.be.true;

            expect(typeof blockHead.block.transactionRootHash).to.equal('string');
            expect(blockHead.block.transactionRootHash.startsWith('0x')).to.be.true;
        });
    });

    describe('Transaction Proof Tests', () => {
        it('should be able to get transaction proof', async () => {

            const accounts = await chain.getComponents('HOST').web3.eth.getAccounts();

            const beforSentL3BlockNumber = await chain.selectBlockNumber()
            const tx = await chain.getComponents('HOST').contract.methods.send("0xAABBCCDD").send({
                from: accounts[0],
                value: 100000000000000000
            })

            for (let i = 0; i < 10; i++) {
                if (await chain.selectBlockNumber() > beforSentL3BlockNumber) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            proof = await chain.createL3TransactionProof('HOST', tx.transactionHash, 0);

            expect(proof).to.not.be.undefined;
        });

        it('should be able to verify transaction proof', async () => {
            const verifiedInHost = await chain.verifyProof(proof, 'HOST');
            expect(verifiedInHost).to.be.true;

            const hostL3BlockNumber = await chain.selectBlockNumber();

            for (let i = 0; i < 10; i++) {
                if (await chain.getBlockNumber("BSC") >= hostL3BlockNumber) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const verifiedInBsc = await chain.verifyProof(proof, 'BSC');
            expect(verifiedInBsc).to.be.true;
        });
    });
});
