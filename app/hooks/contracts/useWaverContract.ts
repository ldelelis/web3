import { Waver__factory as waveFactory } from "typechain-types"

import { Waver } from "~/types"
import { useMetamask, useSigner } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useWaverContract(): Waver | undefined {
  const signer = useSigner()
  const metamask = useMetamask()
  const address = RIKEBY_CONTRACT_ADDRESSES.waver

  if (!metamask || !signer) return undefined

  return waveFactory.connect(address, signer)
}
