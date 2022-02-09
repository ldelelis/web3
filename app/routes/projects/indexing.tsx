import { ReactElement, useEffect, useState } from "react"
// import { json, LoaderFunction, useLoaderData } from "remix"
import { json, LoaderFunction } from "remix"
import { JsonRpcProvider } from "@ethersproject/providers"
import { ERC20__factory as erc20Factory } from "typechain-types"

import { ChainId, Erc20, TransferEvent } from "~/types"

type LoaderData = {
  transferEvents: TransferEvent[]
}

const COMP_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"

export function getProvider({
  chainId,
}: {
  chainId: ChainId
}): JsonRpcProvider {
  switch (chainId) {
    case ChainId.Mainnet: {
      return new JsonRpcProvider(
        "https://eth-mainnet.alchemyapi.io/v2/a5n7e0kB6LJg5nDUx2cFqEYeDoa8aeqP",
        chainId,
      )
    }
    case ChainId.Rinkeby: {
      return new JsonRpcProvider(
        "https://eth-rinkeby.alchemyapi.io/v2/DTrh_uPMx4itUkUWVvdvp3u4HmZxEXJE",
        chainId,
      )
    }
    case ChainId.Localhost: {
      return new JsonRpcProvider()
    }
  }
}

export function getErc20Contract({
  address,
  chainId,
}: {
  address: string
  chainId: ChainId
}): Erc20 {
  const provider = getProvider({ chainId })

  return erc20Factory.connect(address, provider)
}

export const loader: LoaderFunction = async () => {
  // TODO: set holders from transfer events
  const holders = new Set()
  const startBlock = 9601359
  const endBlock = 9603359

  const chainId = ChainId.Mainnet
  const address = COMP_ADDRESS
  const erc20Contract = getErc20Contract({ address, chainId })

  // const blockNumber = await erc20Contract.provider.getBlockNumber()
  // console.log("constloader:LoaderFunction= ~ blockNumber ", blockNumber)

  async function getTransferEvents(
    startBlock: number,
    endBlock: number,
    erc20Contract: Erc20,
  ): Promise<TransferEvent[]> {
    let transferEvents: TransferEvent[] = []

    const BATCH_SIZE = 10

    // TODO: can do this with a functional approach?
    for (
      let fromBlock = startBlock;
      fromBlock <= endBlock;
      fromBlock += BATCH_SIZE
    ) {
      const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)
      const transfersFilter = erc20Contract.filters.Transfer()

      transferEvents = await erc20Contract.queryFilter(
        transfersFilter,
        fromBlock,
        toBlock,
      )
    }

    return transferEvents
  }

  console.log("before transfers")
  // const transferEvents: TransferEvent[] = await getTransferEvents(
  //   startBlock,
  //   endBlock,
  //   erc20Contract,
  // )

  console.log("constloader:LoaderFunction= ~ holders", holders)
  const transferEvents: TransferEvent[] = []

  return json<LoaderData>({ transferEvents })
}

export default function IndexingProject(): ReactElement {
  // const { transferEvents } = useLoaderData<LoaderData>()
  const [transferEvents, setTransferEvents] = useState<TransferEvent[]>([])
  console.log("IndexingProject ~ transferEvents", transferEvents)

  useEffect(() => {
    async function call() {
      const startBlock = 9601359
      const endBlock = 9603359

      const chainId = ChainId.Mainnet
      const address = COMP_ADDRESS
      const erc20Contract = getErc20Contract({ address, chainId })

      const blockNumber = await erc20Contract.provider.getBlockNumber()
      console.log("constloader:LoaderFunction= ~ blockNumber ", blockNumber)

      async function getTransferEvents(
        startBlock: number,
        endBlock: number,
        erc20Contract: Erc20,
      ): Promise<TransferEvent[]> {
        let transferEvents: TransferEvent[] = []

        const BATCH_SIZE = 100

        // TODO: can do this with a functional approach?
        for (
          let fromBlock = startBlock;
          fromBlock <= endBlock;
          fromBlock += BATCH_SIZE
        ) {
          const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)
          console.log("call ~ toBlock ", toBlock)
          const transfersFilter = erc20Contract.filters.Transfer()

          transferEvents = await erc20Contract.queryFilter(
            transfersFilter,
            fromBlock,
            toBlock,
          )
          console.log("call ~ transferEvents", transferEvents)
        }

        return transferEvents
      }

      console.log("before transfers")
      const transferEvents: TransferEvent[] = await getTransferEvents(
        startBlock,
        endBlock,
        erc20Contract,
      )

      setTransferEvents(transferEvents)
    }

    call()
  }, [])

  return (
    <div>
      <h1>IndexingProject</h1>
      {transferEvents.map((transfer) => (
        <span key={transfer.address}>{transfer.address}</span>
      ))}
    </div>
  )
}
