import { Contract } from "@ethersproject/contracts"

import { getAbi } from "~/helpers"
import { useMetamask, useSigner } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES, WavePortalArtifact } from "~/constants"

export function useWavePortalContract(): Contract | undefined {
  const metamask = useMetamask()
  const signer = useSigner()

  if (!metamask || !signer) return undefined

  const abi = getAbi(WavePortalArtifact)
  const address = RIKEBY_CONTRACT_ADDRESSES.wave

  return new Contract(address, abi, signer)
}
