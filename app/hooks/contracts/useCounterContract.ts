import { Counter__factory as counterFactory } from "typechain-types"

import { Counter } from "~/types"
import { useMetamask, useSigner } from "~/hooks"
import { RIKEBY_CONTRACT_ADDRESSES } from "~/constants"

export function useCounterContract(): Counter | undefined {
  const signer = useSigner()
  const metamask = useMetamask()
  const address = RIKEBY_CONTRACT_ADDRESSES.counter

  if (!metamask || !signer) return undefined

  return counterFactory.connect(address, signer)
}
