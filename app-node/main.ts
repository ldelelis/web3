import { BigNumber } from "@ethersproject/bignumber"
import { getBlockNumber, getErc20Contract } from "../app/helpers"
import { ChainId, TransferEvent } from "../app/types"

const COMPOUND_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888"
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
const START_BLOCK = 9601359
const BATCH_SIZE = 100

type Balance = {
  weight: BigNumber,
  address: string
}

type BalanceMapping = {
  [address: string]: BigNumber
}

function getBalanceMapping(transferEvents: TransferEvent[]) {
  const balances = transferEvents.reduce((prevBalances, transferEvent) => {
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

      function composeFromBalance(from: string, nextBalance: BigNumber) {
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
  }, {} as BalanceMapping)

  return balances
}


function mappingToBalances(balanceMapping: BalanceMapping): Balance[] {
  const balances: Balance[] = Object.entries(balanceMapping).map(
    ([address, weight]) => ({ address, weight }),
  )

  return balances
}

async function main(): Promise<void> {
  const contract = getErc20Contract({address: COMPOUND_ADDRESS, chainId: ChainId.Mainnet})
  const endBlock = await getBlockNumber({ chainId: ChainId.Mainnet })

  for (let fromBlock = START_BLOCK; fromBlock <= endBlock; fromBlock += BATCH_SIZE ) {
    const toBlock = Math.min(fromBlock + BATCH_SIZE - 1, endBlock)
    const transferFilters = contract.filters.Transfer()
    const nextEvents = await contract.queryFilter(transferFilters, fromBlock, toBlock)

    const balanceMapping = getBalanceMapping(nextEvents)
    const balances = mappingToBalances(balanceMapping)

    console.log(balances)
  }
}

await main()
