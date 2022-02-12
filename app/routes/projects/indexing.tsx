import { ReactElement, useState, useEffect } from "react"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Erc20, TransferEvent } from "~/types"
import { getBlockNumber, getErc20Contract } from "~/helpers"

const COMPOUND_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
const START_BLOCK = 9601359

type Balance = {
  weight: BigNumber
  address: string
}

type BalanceMapping = {
  [address: string]: BigNumber
}

export default function IndexingProject(): ReactElement {
  const [balances, setBalances] = useState<Balance[]>([])
  const [transferEvents, setTransferEvents] = useState<TransferEvent[]>([])

  async function getTransferEvents(
    startBlock: number,
    endBlock: number,
    erc20Contract: Erc20,
  ): Promise<void> {
    const BATCH_SIZE = 100

    for (
      let fromBlock = startBlock;
      fromBlock <= endBlock;
      fromBlock += BATCH_SIZE
    ) {
      const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)
      const transfersFilter = erc20Contract.filters.Transfer()

      const nextTransferEvents = await erc20Contract.queryFilter(
        transfersFilter,
        fromBlock,
        toBlock,
      )

      console.log("--------------------------------------------")
      console.log("indexTranferEvents ~ fromBlock", fromBlock)
      console.log("indexTranferEvents ~ toBlock", toBlock)
      console.log("--------------------------------------------")

      function getBalanceMapping(transferEvents: TransferEvent[]) {
        const balances = transferEvents.reduce(
          (prevBalances, transferEvent) => {
            const [from, to, weight] = transferEvent.args
            console.log("********************************************")
            console.log("New transfer event:")
            console.log("To =>", to)
            console.log("From =>", from)
            console.log("Weight =>", weight)
            console.log("********************************************")

            let nextBalances = {
              ...prevBalances,
            }
            const isMinting = from === ZERO_ADDRESS
            const shouldUpdateFromBalance = !isMinting

            if (shouldUpdateFromBalance) {
              const balance = prevBalances[from] ?? BigNumber.from(0)
              const nextBalance = balance.sub(weight)

              function composeFromBalance(
                from: string,
                nextBalance: BigNumber,
              ) {
                nextBalances = {
                  ...nextBalances,
                  [from]: nextBalance,
                }
              }

              composeFromBalance(from, nextBalance)
            }

            const isBurning = to === ZERO_ADDRESS
            const shouldUpdateToBalance = !isBurning

            if (shouldUpdateToBalance) {
              const balance = prevBalances[to] ?? BigNumber.from(0)
              const nextBalance = balance.sub(weight)

              function composeToBalance(to: string, nextBalance: BigNumber) {
                nextBalances = {
                  ...nextBalances,
                  [to]: nextBalance,
                }
              }

              composeToBalance(to, nextBalance)
            }

            return nextBalances
          },
          {} as BalanceMapping,
        )

        return balances
      }

      function mappingToBalances(balanceMapping: BalanceMapping): Balance[] {
        const balances: Balance[] = Object.entries(balanceMapping).map(
          ([address, weight]) => ({ address, weight }),
        )

        return balances
      }

      const balanceMapping = getBalanceMapping(nextTransferEvents)
      const balances = mappingToBalances(balanceMapping)

      setBalances((prevBalances) => [...prevBalances, ...balances])

      setTransferEvents((prevTransferEvents) => [
        ...prevTransferEvents,
        ...nextTransferEvents,
      ])
    }
  }

  useEffect(() => {
    const chainId = ChainId.Mainnet
    const erc20Contract = getErc20Contract({
      address: COMPOUND_ADDRESS,
      chainId,
    })

    async function startIndexingTransfers() {
      const blockNumber = await getBlockNumber({ chainId })

      getTransferEvents(START_BLOCK, blockNumber, erc20Contract)
    }

    startIndexingTransfers()
  }, [])

  useEffect(() => {
    const chainId = ChainId.Mainnet
    const erc20Contract = getErc20Contract({
      address: COMPOUND_ADDRESS,
      chainId,
    })

    function handleTransferOff(erc20Contract: Erc20) {
      erc20Contract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`)
      })
    }

    function handleTransferOn(erc20Contract: Erc20) {
      erc20Contract.on("Transfer", (transfer: TransferEvent) => {
        setTransferEvents((prevTransfers) => [...prevTransfers, transfer])
      })
    }

    handleTransferOn(erc20Contract)

    return () => {
      handleTransferOff(erc20Contract)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <h1>IndexingProject</h1>
      {transferEvents.map(({ address, blockNumber }) => (
        <span key={address + blockNumber}>{address}</span>
      ))}
      {balances.map(({ address, weight }) => (
        <span key={address + weight.toString()}>{weight.toString()}</span>
      ))}
    </div>
  )
}
