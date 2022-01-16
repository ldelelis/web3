import invariant from "tiny-invariant"

import { useWeb3Provider } from "~/hooks"

export function useConnectMetamask(): () => Promise<void> {
  const web3Provider = useWeb3Provider()

  async function connectMetamask() {
    invariant(web3Provider, "You need to have Metamask installed")

    await web3Provider.send("eth_requestAccounts", [])
  }

  return connectMetamask
}
