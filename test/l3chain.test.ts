import Mocha from "mocha";
import { L3Chain, Chains, ChainName } from '../src';

import * as sdk from "../src/digester";
import { keccak256, solidityPackedKeccak256 } from "ethers";
import Web3 from "web3";

describe("L3Chain IChain API Test", function () {

    let l3chain: L3Chain;

    before(() => {

        for (let k in Chains) {
            console.log(k);
        }

        // l3chain = new L3Chain({
        //     graphDataBaseHost: `${process.env.GRAPH_HOST}/subgraphs/name/l3chain/host_database`,
        //     HOST: {
        //         web3Provider: new Web3.providers.HttpProvider(process.env.HOST_RPC as string),
        //         contractAddress: "0xfb93Ba0cE755Ce1f0c6c620BA868FA5F0c9889fb",
        //     },
        //     ETH: {
        //         web3Provider: new Web3.providers.HttpProvider(process.env.BSC_RPC as string),
        //         contractAddress: "0x13A656e743a104fFd6b512D0Ab5d9eDF1Ed7049a"
        //     },
        //     BSC: {
        //         web3Provider: new Web3.providers.HttpProvider(process.env.BSC_RPC as string),
        //         contractAddress: "0x13A656e743a104fFd6b512D0Ab5d9eDF1Ed7049a"
        //     },
        // })
    })

    it("main", async function () {
        // let proof86 = await l3chain.createL3TransactionProof("BSC", "0x39d61e3d3354966f4bca353158ef3dc342bb3c66687586ef16681456199fcb4c", 86 - 1)
        // console.log(proof86)

        let proof = await l3chain.createL3TransactionProof("BSC", "0xe9b99ec2508771c2950abd04ae4b46908463620c0ec21eeb3464f0988495c59e", 379 - 1)
        console.log(proof)
    });
});