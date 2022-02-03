import { Contract } from "@ethersproject/contracts"

import { getAbi } from "~/helpers"
import { useMetamask, useSigner } from "~/hooks"
import {
  Erc721PayPerMintArtifact,
  LOCALHOST_CONTRACT_ADDRESSES,
} from "~/constants"

export function useErc721Contract(): Contract | undefined {
  const signer = useSigner()
  const metamask = useMetamask()

  if (!metamask || !signer) return undefined

  const abi = getAbi(Erc721PayPerMintArtifact)
  const address = LOCALHOST_CONTRACT_ADDRESSES.erc721

  return new Contract(address, abi, signer)
}
