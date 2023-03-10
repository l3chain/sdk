import Mocha from "mocha";
import { L3Chain, L3ProvidersLocalHost, BlockHead, GraphQlClient } from '../src';

describe("L3Chain IChain API Test", function () {

    let l3chain: L3Chain;
    let qlClient: GraphQlClient;

    before(() => {
        l3chain = new L3Chain(L3ProvidersLocalHost)
        qlClient = new GraphQlClient(L3ProvidersLocalHost.HOST.graphDataBaseHost)
    })

    it("main", async function () {
        // await l3chain.getBlockProposeds('0x5a70158325399715fa079da19fb5fcb56e50b4dcdb9a28ddbe50611ec8ab28c4').then(console.log)
        let proof = await l3chain.getL3TransactionProof(
            'HOST',
            '0x137e9f6f5e5a0f0e00de4fbf25dd19bcc06ea96bd48cacf02555b08f3ad02197',
            0
        );

        console.log(`Verify On HOST: ${await l3chain.verifyL3Transaction(proof, 'HOST')}`);
        console.log(`Verify On ETH: ${await l3chain.verifyL3Transaction(proof, 'ETH')}`);
        console.log(`Verify On BSC: ${await l3chain.verifyL3Transaction(proof, 'BSC')}`);

    });


});