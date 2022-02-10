import { ReactElement, useState, useEffect } from "react"

import { getErc20Contract } from "~/helpers"
import { ChainId, Erc20, TransferEvent } from "~/types"

const COMP_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"

export default function IndexingProject(): ReactElement {
  const [transferEvents, setTransferEvents] = useState<TransferEvent[]>([])

  useEffect(() => {
    async function indexTranferEvents() {
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
        const transferEvents: TransferEvent[] = []

        const BATCH_SIZE = 100

        for (
          let fromBlock = startBlock;
          fromBlock <= endBlock;
          fromBlock += BATCH_SIZE
        ) {
          const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)
          const transfersFilter = erc20Contract.filters.Transfer()

          const transferEvents = await erc20Contract.queryFilter(
            transfersFilter,
            fromBlock,
            toBlock,
          )

          setTransferEvents((prevTransferEvents) => [
            ...prevTransferEvents,
            ...transferEvents,
          ])
        }

        return transferEvents
      }

      const transferEvents: TransferEvent[] = await getTransferEvents(
        startBlock,
        endBlock,
        erc20Contract,
      )

      setTransferEvents(transferEvents)
    }

    indexTranferEvents()
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
