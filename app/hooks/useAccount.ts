import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

import { useMetamask } from "~/hooks"

export function useAccount(): string | undefined {
  const [account, setAccount] = useState<undefined | string>(undefined)

  const metamask = useMetamask()

  useEffect(() => {
    if (!metamask) return

    async function getAccount(metamask: Web3Provider) {
      const accounts = await metamask.send("eth_accounts", [])

      setAccount(accounts[0])
    }

    getAccount(metamask)
  }, [metamask])

  return account
}
