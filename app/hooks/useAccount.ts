import { useEffect, useState } from "react"
import { useWeb3Provider } from "./useWeb3Provider"

export function useAccount(): string | undefined {
  const [account, setAccount] = useState<undefined | string>(undefined)

  const web3Provider = useWeb3Provider()

  useEffect(() => {
    async function getAccount() {
      if (!web3Provider) return

      const accounts = await web3Provider.send("eth_requestAccounts", [])

      setAccount(accounts[0])
    }

    getAccount()
  }, [web3Provider])

  return account
}
