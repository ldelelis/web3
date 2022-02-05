import { JsonRpcProvider } from "@ethersproject/providers"

import { ChainId } from "~/types"

export function useProvider({
  chainId,
}: {
  chainId?: ChainId
}): JsonRpcProvider | undefined {
  switch (chainId) {
    case ChainId.Mainnet: {
      return new JsonRpcProvider(
        "https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP",
      )
    }
    case ChainId.Rinkeby: {
      return new JsonRpcProvider(
        "https://eth-rinkeby.alchemyapi.io/v2/DTrh_uPMx4itUkUWVvdvp3u4HmZxEXJE",
      )
    }
    case ChainId.Localhost: {
      return new JsonRpcProvider()
    }
    default: {
      return undefined
    }
  }
}
