import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

export function useChainId({
  metamask,
}: {
  metamask?: Web3Provider
}): number | undefined {
  const [chainId, setChainId] = useState<undefined | number>(undefined)

  function hexToNumber(hexChainId: string): number {
    return Number(hexChainId.slice(2))
  }

  useEffect(() => {
    if (!metamask) return

    async function getChainId(metamask: Web3Provider) {
      const hexChainId = await metamask.send("eth_chainId", [])
      const chainId = hexToNumber(hexChainId)

      setChainId(chainId)
    }

    getChainId(metamask)
  }, [metamask])

  // TODO: listen to "chainChanged" event
  // useEffect(
  //   function listenChainChangeEvent() {
  //     if (!metamask) return

  //     function handleChainChange(hexChainId: string) {
  //       const chainId = hexToNumber(hexChainId)

  //       setChainId(chainId)
  //     }

  //     metamask.on("chainChanged", handleChainChange)

  //     return () => {
  //       metamask.removeListener("chainChanged", () => {
  //         console.warn(`Unsubscribed from "chainChanged" Metamask's event`)
  //       })
  //     }
  //   },
  //   [metamask],
  // )

  return chainId
}
