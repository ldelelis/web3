import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

import { useWeb3Provider } from "~/hooks"

export function useAccount(): string | undefined {
  const [account, setAccount] = useState<undefined | string>(undefined)

  const web3Provider = useWeb3Provider()

  useEffect(() => {
    if (!web3Provider) return

    async function getAccount(web3Provider: Web3Provider) {
      const accounts = await web3Provider.send("eth_accounts", [])

      setAccount(accounts[0])
    }

    getAccount(web3Provider)
  }, [web3Provider])

  return account
}
