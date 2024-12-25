export type BlockNumber = {
  blocks: { number: number }[]
}

export const selectBlockNumber = () => `
{
  blocks(orderDirection: desc, orderBy: number, first: 1) {
    number
  }
}
`;