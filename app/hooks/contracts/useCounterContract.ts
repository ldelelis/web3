import { Contract } from "@ethersproject/contracts"

import { getAbi } from "~/helpers"
import { useMetamask, useSigner } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES, CounterArtifact } from "~/constants"

export function useCounterContract(): Contract | undefined {
  const metamask = useMetamask()
  const signer = useSigner()

  if (!metamask || !signer) return undefined

  const abi = getAbi(CounterArtifact)
  const address = RIKEBY_CONTRACT_ADDRESSES.counter

  return new Contract(address, abi, signer)
}
