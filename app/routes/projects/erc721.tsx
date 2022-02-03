import { ReactElement } from "react"
import { Contract } from "@ethersproject/contracts"

import { ChainId } from "~/types"
import {
  useChainId,
  useAccount,
  useMetamask,
  useBlockNumber,
  useErc721Contract,
  useConnectMetamask,
} from "~/hooks"

export default function Erc721(): ReactElement {
  const metamask = useMetamask()

  const account = useAccount({ metamask })
  const chainId = useChainId({ metamask })
  const blockNumber = useBlockNumber()
  const erc721Contract = useErc721Contract()
  const connectMetamask = useConnectMetamask()

  const isLocalhost = chainId === ChainId.Localhost

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !erc721Contract || !blockNumber) {
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

  if (!isLocalhost) {
    return (
      <div>
        <h3>
          This section works on Localhost and having the node running locally.
          Try changing to it from Metamask
        </h3>
      </div>
    )
  }

  return <Information account={account} erc721Contract={erc721Contract} />
}

function Information({
  account,
  erc721Contract,
}: {
  account: string
  erc721Contract: Contract
}) {
  return (
    <div className="flex flex-col">
      <span>Sender: {account}</span>
      <span>Contract address: {erc721Contract.address}</span>
    </div>
  )
}
