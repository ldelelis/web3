import { ERC20__factory as erc20Factory } from "typechain-types"

import { getProvider } from "~/helpers"
import { ChainId, Erc20 } from "~/types"

export function getErc20Contract({
  address,
  chainId,
}: {
  address: string
  chainId: ChainId
}): Erc20 {
  const provider = getProvider({ chainId })

  return erc20Factory.connect(address, provider)
}
