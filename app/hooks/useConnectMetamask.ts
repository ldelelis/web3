import invariant from "tiny-invariant"

import { useMetamask } from "~/hooks"

export function useConnectMetamask(): () => Promise<void> {
  const metamask = useMetamask()

  async function connectMetamask() {
    invariant(metamask, "You need to have Metamask installed")

    await metamask.send("eth_requestAccounts", [])
  }

  return connectMetamask
}
