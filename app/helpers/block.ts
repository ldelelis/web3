import { ChainId } from "~/types"
import { getProvider } from "~/helpers"

export async function getBlockNumber({
  chainId,
}: {
  chainId: ChainId
}): Promise<number> {
  const provider = getProvider({ chainId })
  const blockNumber = await provider.getBlockNumber()

  return blockNumber
}
