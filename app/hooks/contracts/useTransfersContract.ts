import { Transfers__factory as transfersFactory } from "../../../typechain-types"

import { Transfers } from "~/types"
import { useMetamask, useSigner } from "~/hooks"
import { MAINNET_CONTRACT_ADDRESSES } from "~/constants"

export function useTransfersContract(): Transfers | undefined {
  const signer = useSigner()
  const metamask = useMetamask()
  const address = MAINNET_CONTRACT_ADDRESSES.transfers

  if (!metamask || !signer) return undefined

  return transfersFactory.connect(address, signer)
}
