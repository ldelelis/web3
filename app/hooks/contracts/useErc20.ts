import { Contract } from "@ethersproject/contracts"

import { getAbi } from "~/helpers"
import { useMetamask, useSigner } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES, Erc20Artifact } from "~/constants"

export function useWaveContract(): Contract | undefined {
  const metamask = useMetamask()
  const signer = useSigner()

  if (!metamask || !signer) return undefined

  const abi = getAbi(Erc20Artifact)
  const address = RIKEBY_CONTRACT_ADDRESSES.erc20

  return new Contract(address, abi, signer)
}
