import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

import { useWeb3Provider } from "~/hooks"

export function useChainId(): number | undefined {
  const [chainId, setChainId] = useState<undefined | number>(undefined)

  const web3Provider = useWeb3Provider()

  useEffect(() => {
    if (!web3Provider) return

    function hexToNumber(hexChainId: string): number {
      return Number(hexChainId.slice(2))
    }

    async function getAccount(web3Provider: Web3Provider) {
      const hexChainId = await web3Provider.send("eth_chainId", [])
      const chainId = hexToNumber(hexChainId)

      setChainId(chainId)
    }

    getAccount(web3Provider)
  }, [web3Provider])

  return chainId
}
