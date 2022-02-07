import { useState, ReactElement, useEffect } from "react"
import { Event } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"
import invariant from "tiny-invariant"

import { ETHERSCAN_URL } from "~/constants"
import { ChainId, Transfers as TransfersContract } from "~/types"
import { bigNumberToString } from "~/helpers"
import {
  useChainId,
  useAccount,
  useMetamask,
  useBlockNumber,
  useConnectMetamask,
  useTransfersContract,
} from "~/hooks"

export default function TransfersProject(): ReactElement {
  const metamask = useMetamask()

  const account = useAccount({ metamask })
  const chainId = useChainId({ metamask })
  const blockNumber = useBlockNumber({ chainId })
  const connectMetamask = useConnectMetamask()
  const transfersContract = useTransfersContract()

  const isMainnet = chainId === ChainId.Mainnet

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !transfersContract || !blockNumber) {
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

  return (
    <Information
      blockNumber={blockNumber}
      transfersContract={transfersContract}
    />
  )
}

function Information({
  blockNumber,
  transfersContract,
}: {
  blockNumber: number
  transfersContract: TransfersContract
}): ReactElement {
  const [name, setName] = useState<string | undefined>(undefined)
  const [symbol, setSymbol] = useState<string | undefined>(undefined)
  const [decimals, setDecimals] = useState<number | undefined>(undefined)
  const [totalSupply, setTotalSupply] = useState<BigNumber | undefined>(
    undefined,
  )

  const isLoading = !name || !symbol || !decimals || !totalSupply

  useEffect(() => {
    async function getInformation() {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        transfersContract.name(),
        transfersContract.symbol(),
        transfersContract.decimals(),
        transfersContract.totalSupply(),
      ])

      setName(name)
      setSymbol(symbol)
      setDecimals(decimals)
      setTotalSupply(totalSupply)
    }

    getInformation()
  }, [transfersContract])

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
          symbol={symbol}
          transfersContract={transfersContract}
        />
      </div>
    </div>
  )
}

function Transfers({
  symbol,
  decimals,
  blockNumber,
  transfersContract,
}: {
  symbol: string
  decimals: number
  blockNumber: number
  transfersContract: TransfersContract
}): ReactElement {
  const TRANSFER_BLOCKS_AMOUNT = 3000
  const BLOCK_CONFIRMATIONS = 20

  const [transfers, setTransfers] = useState<Event[]>([])

  useEffect(() => {
    async function getPastTransfers() {
      const transfersFilter = transfersContract.filters.Transfer()
      const transfers = await transfersContract.queryFilter(
        transfersFilter,
        blockNumber - TRANSFER_BLOCKS_AMOUNT,
        blockNumber,
      )

      setTransfers(transfers)
    }

    getPastTransfers()
  }, [blockNumber, transfersContract])

  useEffect(() => {
    if (!transfersContract) return

    function handleTransferOff(transfersContract: TransfersContract) {
      transfersContract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Transfers contract's event`)
      })
    }

    function handleTransferOn(transfersContract: TransfersContract) {
      transfersContract.on("Transfer", (transfer) => {
        setTransfers((prevTransfers) => [...prevTransfers, transfer])
      })
    }

    handleTransferOn(transfersContract)

    return () => {
      handleTransferOff(transfersContract)
    }
  }, [transfersContract])

  function byConfirmations(transfer: Event) {
    return blockNumber - transfer.blockNumber > BLOCK_CONFIRMATIONS
  }

  return (
    <ul className="flex flex-col items-center justify-center">
      {transfers.filter(byConfirmations).map(({ args, transactionHash }) => {
        invariant(args, "Transfer events should include arguments")

        const url = ETHERSCAN_URL + transactionHash

        const { from, to, value: bigAmount } = args
        const amount = bigNumberToString(bigAmount, decimals)

        const key = `${from}_${to}_${amount}_${transactionHash}`

        return (
          <a
            key={key}
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
