import { Contract } from "@ethersproject/contracts"

import { useMetamask } from "~/hooks"
import { CounterArtifact } from "~/artifacts"

export function useCounterContract(): Contract | undefined {
  const metamask = useMetamask()

  if (!metamask) return undefined

  function getAbi(artifact: any) {
    const { abi } = artifact.compilerOutput

    return abi
  }

  const address = "0x1D2561D18dD2fc204CcC8831026d28375065ed53"
  const abi = getAbi(CounterArtifact)
  const signer = metamask.getSigner()

  return new Contract(address, abi, signer)
}
