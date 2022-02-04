/* eslint-disable camelcase */
import { Signer } from "@ethersproject/abstract-signer"

import { Erc721PayPerMint } from "~/types"

import { Erc721PayPerMint__factory } from "../../typechain-types"

export function getErc721Contract(
  address: string,
  signer: Signer,
): Erc721PayPerMint {
  return Erc721PayPerMint__factory.connect(address, signer)
}
