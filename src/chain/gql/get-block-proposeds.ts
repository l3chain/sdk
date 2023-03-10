import { BlockHead } from "../block";

export type BlockProposeds = {
  block: BlockHead & { epoch: number, time: number },
  blockProposeds: { isVerifier: boolean, proposer: string, time: number, signature: string }[]
}

export const getBlockProposeds = (blockHash: string) => `
{
  block(id:"${blockHash}") {
    epoch
    hash
    number
    time
    transactionMerkleRoot
    transactionRootHash
  }
  blockProposeds(where: {hash: "${blockHash}"}) {
    time
    signature
    proposer
    isVerifier
  }
}
`;