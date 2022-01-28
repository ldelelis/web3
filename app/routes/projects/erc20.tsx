import { useState, ReactElement, useEffect } from "react"
import { Contract, Event } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"
import invariant from "tiny-invariant"

import { ChainId } from "~/types"
import { ETHERSCAN_URL } from "~/constants"
import { bigNumberToString } from "~/helpers"
import {
  useChainId,
  useAccount,
  useBlockNumber,
  useErc20Contract,
  useConnectMetamask,
} from "~/hooks"

export default function Erc20(): ReactElement {
  const account = useAccount()
  const chainId = useChainId()
  const blockNumber = useBlockNumber()
  const erc20Contract = useErc20Contract()
  const connectMetamask = useConnectMetamask()

  const isMainnet = chainId === ChainId.Mainnet

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !erc20Contract || !blockNumber) {
    return (
      <div className="flex justify-end items-center w-full space-x-2">
        <h3>You need to connect your Metamask</h3>
        <button
          className="p-2 bg-indigo-500 rounded-sm text-white"
          onClick={handleConnectMetamaskClick}
        >
          Connect wallet
        </button>
      </div>
    )
  }

  if (!isMainnet) {
    return (
      <div>
        <h3>This section works on Mainnet. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return <Information blockNumber={blockNumber} erc20Contract={erc20Contract} />
}

function Information({
  blockNumber,
  erc20Contract,
}: {
  blockNumber: number
  erc20Contract: Contract
}): ReactElement {
  const [name, setName] = useState<string | undefined>(undefined)
  const [symbol, setSymbol] = useState<string | undefined>(undefined)
  const [decimals, setDecimals] = useState<number | undefined>(undefined)
  const [totalSupply, setTotalSupply] = useState<BigNumber | undefined>(
    undefined,
  )

  const isLoading = !name || !symbol || !decimals || !totalSupply

  useEffect(
    function getInformation() {
      async function call() {
        const [name, symbol, decimals, totalSupply] = await Promise.all([
          erc20Contract.name(),
          erc20Contract.symbol(),
          erc20Contract.decimals(),
          erc20Contract.totalSupply(),
        ])

        setName(name)
        setSymbol(symbol)
        setDecimals(decimals)
        setTotalSupply(totalSupply)
      }

      call()
    },
    [erc20Contract],
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Gathering information...</p>
      </div>
    )
  }

  const totalSupplyLabel = bigNumberToString(totalSupply, decimals)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center">
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{name}</span> as
          it&apos;s name
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{symbol}</span> as
          it&apos;s symbol
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">{decimals}</span>{" "}
          decimals
        </p>
        <p>
          This token has{" "}
          <span className="underline underline-offset-2">
            {totalSupplyLabel}
          </span>{" "}
          tokens
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3>Transfers</h3>
        <Transfers
          blockNumber={blockNumber}
          decimals={decimals}
          erc20Contract={erc20Contract}
          symbol={symbol}
        />
      </div>
    </div>
  )
}

function Transfers({
  symbol,
  decimals,
  blockNumber,
  erc20Contract,
}: {
  symbol: string
  decimals: number
  blockNumber: number
  erc20Contract: Contract
}): ReactElement {
  const TRANSFER_BLOCKS_AMOUNT = 3000
  const TRANSFER_CONFIRMATIONS = 20

  const [transfers, setTransfers] = useState<Event[]>([])

  useEffect(
    function getPastTransfers() {
      async function call() {
        const transfersFilter = erc20Contract.filters.Transfer()
        const transfers = await erc20Contract.queryFilter(
          transfersFilter,
          blockNumber - TRANSFER_BLOCKS_AMOUNT,
          blockNumber,
        )

        setTransfers(transfers)
      }

      call()
    },
    [blockNumber, erc20Contract],
  )

  useEffect(
    function handleTransferEvent() {
      if (!erc20Contract) return

      erc20Contract.on("Transfer", (transfer) => {
        setTransfers((prevTransfers) => [...prevTransfers, transfer])
      })

      return () => {
        erc20Contract.off("Transfer", () => {
          console.warn(`Unsubscribed from "Transfer" Erc20 contract's event`)
        })
      }
    },
    [erc20Contract],
  )

  function byConfirmedEvent(transfer: Event) {
    return blockNumber - transfer.blockNumber > TRANSFER_CONFIRMATIONS
  }

  return (
    <ul className="flex flex-col items-center justify-center">
      {transfers.filter(byConfirmedEvent).map(({ args, transactionHash }) => {
        invariant(args, "Transfer events should include arguments")

        const url = ETHERSCAN_URL + transactionHash

        const { from, to, value: bigAmount } = args
        const amount = bigNumberToString(bigAmount, decimals)

        return (
          <a
            key={transactionHash}
            className="hover:underline underline-offset-2"
            href={url}
          >
            {from} to {to} for {amount} {symbol}
          </a>
        )
      })}
    </ul>
  )
}
