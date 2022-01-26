import { Contract } from "@ethersproject/contracts"

import { getAbi } from "~/helpers"
import { useMetamask, useSigner } from "~/hooks"
import { MAINNET_CONTRACT_ADDRESSES, Erc20Artifact } from "~/constants"

export function useErc20Contract(): Contract | undefined {
  const signer = useSigner()
  const metamask = useMetamask()

  if (!metamask || !signer) return undefined

  const abi = getAbi(Erc20Artifact)
  const address = MAINNET_CONTRACT_ADDRESSES.erc20

  return new Contract(address, abi, signer)
}
