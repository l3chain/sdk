import Mocha from "mocha";
import { L3Chain, GraphQlClient } from '../src';

import * as sdk from "../src/digester";
import { keccak256, solidityPackedKeccak256 } from "ethers";

describe("L3Chain IChain API Test", function () {

    let l3chain: L3Chain;
    let qlClient: GraphQlClient;

    it("main", async function () {

        let stypes = ["address", "uint256", "bytes32", "bool"]
        let svalue = ["0xF582DD76bb327010a360f0E24369F898bfA6Cf47", "10000000", "0xe1430158eac8c4aa6a515be5ef2c576a7a9559adbd0c276cd9573854e0473494", "true"]

        console.log(sdk.solidityPackedKeccak256(stypes, svalue))
        console.log(solidityPackedKeccak256(stypes, svalue))

        console.log(sdk.solidityKeccak256("0x1337"))
        console.log(keccak256("0x1337"))

    });


});