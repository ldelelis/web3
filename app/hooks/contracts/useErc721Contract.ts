import { useSigner } from "~/hooks"
import { Erc721PayPerMint } from "~/types"
import { getErc721Contract } from "~/helpers"
import { LOCALHOST_CONTRACT_ADDRESSES } from "~/constants"

export function useErc721Contract(): Erc721PayPerMint | undefined {
  const signer = useSigner()

  if (!signer) return undefined

  const erc721Contract = getErc721Contract(
    LOCALHOST_CONTRACT_ADDRESSES.erc721,
    signer,
  )

  return erc721Contract
}
