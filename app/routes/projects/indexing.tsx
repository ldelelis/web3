import { ReactElement } from "react"
import { json, LoaderFunction, useLoaderData } from "remix"

import { getErc20Contract } from "~/helpers"
import { ChainId, Erc20, TransferEvent } from "~/types"

type LoaderData = {
  transferEvents: TransferEvent[]
}

const COMP_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"

export const loader: LoaderFunction = async () => {
  // TODO: set holders from transfer events
  const holders = new Set()
  const startBlock = 9601359
  const endBlock = 9603359

  const chainId = ChainId.Mainnet
  const address = COMP_ADDRESS
  const erc20Contract = getErc20Contract({ address, chainId })

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

  const transferEvents: TransferEvent[] = await getTransferEvents(
    startBlock,
    endBlock,
    erc20Contract,
  )

  console.log("constloader:LoaderFunction= ~ holders", holders)

  return json<LoaderData>({ transferEvents })
}

export default function IndexingProject(): ReactElement {
  const { transferEvents } = useLoaderData<LoaderData>()

  return (
    <div>
      <h1>IndexingProject</h1>
      {transferEvents.map((transfer) => (
        <span key={transfer.address}>{transfer.address}</span>
      ))}
    </div>
  )
}
