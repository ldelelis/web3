import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"

export function useAccount({
  metamask,
}: {
  metamask?: Web3Provider
}): string | undefined {
  const [account, setAccount] = useState<undefined | string>(undefined)

  useEffect(() => {
    if (!metamask) return

    async function getAccount(metamask: Web3Provider) {
      const accounts = await metamask.send("eth_accounts", [])

      setAccount(accounts[0])
    }

    getAccount(metamask)
  }, [metamask])

  // TODO: listen to "accountsChanged" event
  // useEffect(
  //   function listenAccountsChangeEvent() {
  //     if (!metamask) return

  //     function handleAccountChange(accounts: string[]) {
  //       setAccount(accounts[0])
  //     }

  //     metamask.on("accountsChanged", handleAccountChange)

  //     return () => {
  //       metamask.removeListener("accountsChanged", () => {
  //         console.warn(`Unsubscribed from "accountsChanged" Metamask's event`)
  //       })
  //     }
  //   },
  //   [metamask],
  // )

  return account
}
