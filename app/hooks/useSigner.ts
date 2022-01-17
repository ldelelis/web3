import { JsonRpcSigner } from "@ethersproject/providers"

import { useMetamask } from "~/hooks"

export function useSigner(): JsonRpcSigner | undefined {
  const metamask = useMetamask()

  if (!metamask) return undefined

  return metamask.getSigner()
}
