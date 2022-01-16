import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

import { useMetamask } from "~/hooks"

export function useChainId(): number | undefined {
  const [chainId, setChainId] = useState<undefined | number>(undefined)

  const metamask = useMetamask()

  useEffect(() => {
    if (!metamask) return

    function hexToNumber(hexChainId: string): number {
      return Number(hexChainId.slice(2))
    }

    async function getAccount(metamask: Web3Provider) {
      const hexChainId = await metamask.send("eth_chainId", [])
      const chainId = hexToNumber(hexChainId)

      setChainId(chainId)
    }

    getAccount(metamask)
  }, [metamask])

  return chainId
}
