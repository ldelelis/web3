import { JsonRpcProvider } from "@ethersproject/providers"

export function getRpcProvider(): JsonRpcProvider {
  return new JsonRpcProvider(
    `https://rinkeby.infura.io/v3/d76844a42bbd4b7fb2214b629006a745`,
  )
}
