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

    async function getInitialBlockNumber(provider: JsonRpcProvider) {
      const blockNumber = await provider.getBlockNumber()
      setBlockNumber(blockNumber)
    }

    getInitialBlockNumber(provider)
  }, [provider])

  // TODO: listen to "block" event
  // useEffect(
  //   function listenBlockEvent() {
  //     function handleBlockNumber(blockNumber: number) {
  //       setBlockNumber(blockNumber)
  //     }

  //     provider.on("block", handleBlockNumber)

  //     return () => {
  //       alchemy.off("block", () => {
  //         console.warn(`Unsubscribed from "block" Web3Provider event`)
  //       })
  //     }
  //   },
  //   [alchemy],
  // )

  return blockNumber
}
