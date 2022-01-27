import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

import { useMetamask } from "~/hooks"

export function useBlockNumber(): number | undefined {
  const [blockNumber, setBlockNumber] = useState<undefined | number>(undefined)

  const metamask = useMetamask()

  useEffect(() => {
    if (!metamask) return

    async function getBlockNumber(metamask: Web3Provider) {
      const blockNumber = await metamask.getBlockNumber()

      setBlockNumber(blockNumber)
    }

    getBlockNumber(metamask)
  }, [metamask])

  return blockNumber
}
