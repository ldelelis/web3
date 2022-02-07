import { useEffect, useState } from "react"
import { JsonRpcProvider } from "@ethersproject/providers"

import { ChainId } from "~/types"
import { useProvider } from "~/hooks"

export function useBlockNumber({
  chainId,
}: {
  chainId?: ChainId
}): number | undefined {
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)

  const provider = useProvider({ chainId })

  useEffect(() => {
    if (!provider) return

    const blockIntervalId = setInterval(() => getBlockNumber(provider), 10000)

    async function getBlockNumber(provider: JsonRpcProvider) {
      const blockNumber = await provider.getBlockNumber()
      setBlockNumber(blockNumber)
    }

    getBlockNumber(provider)

    return () => {
      clearInterval(blockIntervalId)
    }
  }, [provider])

  return blockNumber
}
