import { useEffect, useState } from "react"
import { useWeb3Provider } from "./useWeb3Provider"

export function useChainId(): number | undefined {
  const [chainId, setChainId] = useState<undefined | number>(undefined)

  const web3Provider = useWeb3Provider()

  useEffect(() => {
    function getChainId(hexChainId: string): number {
      return Number(hexChainId.slice(2))
    }

    async function getAccount() {
      if (!web3Provider) return

      const hexChainId = await web3Provider.send("eth_chainId", [])
      const chainId = getChainId(hexChainId)

      setChainId(chainId)
    }

    getAccount()
  }, [web3Provider])

  return chainId
}
