import { Mint__factory as mintFactory } from "typechain-types"

import { Mint } from "~/types"
import { useSigner } from "~/hooks"
import { LOCALHOST_CONTRACT_ADDRESSES } from "~/constants"

export function useMintContract(): Mint | undefined {
  const signer = useSigner()
  const address = LOCALHOST_CONTRACT_ADDRESSES.mint

  if (!signer) return undefined

  return mintFactory.connect(address, signer)
}
