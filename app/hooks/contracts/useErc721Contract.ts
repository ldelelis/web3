/* eslint-disable camelcase */
import { Signer } from "@ethersproject/abstract-signer"
import { Erc721PayPerMint__factory } from "typechain-types"

import { useSigner } from "~/hooks"
import { Erc721PayPerMint } from "~/types"
import { LOCALHOST_CONTRACT_ADDRESSES } from "~/constants"

export function getErc721Contract(
  address: string,
  signer: Signer,
): Erc721PayPerMint {
  return Erc721PayPerMint__factory.connect(address, signer)
}

export function useErc721Contract(): Erc721PayPerMint | undefined {
  const signer = useSigner()

  if (!signer) return undefined

  const erc721Contract = getErc721Contract(
    LOCALHOST_CONTRACT_ADDRESSES.erc721,
    signer,
  )

  return erc721Contract
}
