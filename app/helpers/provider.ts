import { JsonRpcProvider } from "@ethersproject/providers"

export function getAlchemy(): JsonRpcProvider {
  return new JsonRpcProvider(
    `https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP`,
  )
}

export function getLocalhost(): JsonRpcProvider {
  return new JsonRpcProvider()
}
