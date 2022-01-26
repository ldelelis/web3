import { useState, ReactElement, useEffect } from "react"
import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId } from "~/types"
import { bigNumberToString } from "~/helpers"
import {
  useChainId,
  useAccount,
  useErc20Contract,
  useConnectMetamask,
} from "~/hooks"

export default function Erc20(): ReactElement {
  const account = useAccount()
  const chainId = useChainId()
  const erc20Contract = useErc20Contract()
  const connectMetamask = useConnectMetamask()

  const isMainnet = chainId === ChainId.Mainnet

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !erc20Contract) {
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

  return <Information erc20Contract={erc20Contract} />
}

function Information({
  erc20Contract,
}: {
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
        <span className="underline underline-offset-2">{totalSupplyLabel}</span>{" "}
        tokens
      </p>
    </div>
  )
}

// constants
// const EVENT = "Transfer"
// const BLOCKS_AMOUNT = 100

// const abi = ERC20Interface
// const address = ERC20_ADDRESS

// type TransfersProps = {
//   library: Web3Provider
//   blockNumber: number
// }

// const Transfers: FC<TransfersProps> = ({ library, blockNumber }) => {
//   // custom hooks
//   const erc20Contract = useContractInstance({ abi, address, library })
//   const events = useContractEvents({ erc20Contract, event: "Transfer" })
//   console.log("erc20Contract", contract)

//   return (
//     <div>
//       {events?.map((event) => (
//         <span key={11}>hola</span>
//       ))}
//     </div>
//   )
// }
