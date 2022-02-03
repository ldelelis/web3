import { getAlchemy } from "~/helpers"

export async function getBlockNumber(): Promise<number> {
  const alchemy = getAlchemy()
  const blockNumber = await alchemy.getBlockNumber()

  return blockNumber
}
