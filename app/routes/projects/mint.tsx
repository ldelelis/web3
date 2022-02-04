import { ReactElement } from "react"

import { ChainId, Mint as MintContract } from "~/types"
import {
  useChainId,
  useAccount,
  useMetamask,
  useBlockNumber,
  useMintContract,
  useConnectMetamask,
} from "~/hooks"

export default function Mint(): ReactElement {
  const metamask = useMetamask()

  const account = useAccount({ metamask })
  const chainId = useChainId({ metamask })
  const blockNumber = useBlockNumber()
  const mintContract = useMintContract()
  const connectMetamask = useConnectMetamask()

  const isLocalhost = chainId === ChainId.Localhost

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !mintContract || !blockNumber) {
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

  return <Information mintContract={mintContract} owner={account} />
}

function Information({
  owner,
  mintContract,
}: {
  owner: string
  mintContract: MintContract
}) {
  return (
    <div className="flex flex-col">
      <span>Owner: {owner}</span>
      <span>Contract address: {mintContract.address}</span>
    </div>
  )
}
