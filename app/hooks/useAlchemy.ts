import { JsonRpcProvider } from "@ethersproject/providers"

export function useAlchemy(): JsonRpcProvider {
  return new JsonRpcProvider(
    `https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP`,
  )
}
