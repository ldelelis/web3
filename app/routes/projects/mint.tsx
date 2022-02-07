import { useState, useEffect, ChangeEvent, ReactElement } from "react"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Mint as MintContract } from "~/types"
import {
  useChainId,
  useAccount,
  useGasPrice,
  useMetamask,
  useBlockNumber,
  useMintContract,
  useConnectMetamask,
} from "~/hooks"

export default function MintProject(): ReactElement {
  const metamask = useMetamask()

  const account = useAccount({ metamask })
  const chainId = useChainId({ metamask })
  const blockNumber = useBlockNumber({ chainId })
  const mintContract = useMintContract()
  const connectMetamask = useConnectMetamask()

  const isLocalhost = chainId === ChainId.Localhost

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  if (!account || !mintContract || typeof blockNumber !== "number") {
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

  return (
    <Information
      blockNumber={blockNumber}
      mintContract={mintContract}
      owner={account}
    />
  )
}

function Information({
  owner,
  blockNumber,
  mintContract,
}: {
  owner: string
  blockNumber: number
  mintContract: MintContract
}) {
  const [tokenIds, setTokenIds] = useState<BigNumber[]>([])
  const [tokensCount, setTokensCount] = useState<number>(0)

  const gasPrice = useGasPrice()

  useEffect(() => {
    async function getTokensCount(blockNumber: number) {
      const bigTokensCount = await mintContract.balanceOf(owner, {
        blockTag: blockNumber,
      })
      const tokensCount = bigTokensCount.toNumber()

      setTokensCount(tokensCount)
    }

    getTokensCount(blockNumber)
  }, [blockNumber, mintContract, owner])

  useEffect(() => {
    if (tokensCount < 1) return

    async function getTokenIds(tokensCount: number) {
      const tokenIdsPromises = Array.from({ length: tokensCount }, (_, index) =>
        mintContract.tokenOfOwnerByIndex(owner, index, {
          blockTag: blockNumber,
        }),
      )
      const tokenIds = await Promise.all(tokenIdsPromises)

      setTokenIds(tokenIds)
    }

    getTokenIds(tokensCount)
  }, [blockNumber, mintContract, owner, tokensCount])

  useEffect(() => {
    if (!mintContract) return

    function handleTransferOff(mintContract: MintContract) {
      mintContract.off("Transfer", () => {
        console.warn(`Unsubscribed from "Transfer" Mint contract's event`)
      })
    }

    function handleTransferOn(mintContract: MintContract) {
      mintContract.on("Transfer", (_, __, tokenId) => {
        setTokenIds((prevTokenIds) => [...prevTokenIds, tokenId])
      })
    }

    handleTransferOn(mintContract)

    return () => {
      handleTransferOff(mintContract)
    }
  }, [mintContract])

  async function canMint(tokenId: number) {
    const doesTokenExist = await mintContract.exists(tokenId)

    return !doesTokenExist
  }

  async function mint(tokenId: number) {
    if (!gasPrice) {
      console.warn('You need to know the "gasPrice" to execute this method')

      return
    }

    const bigTokenId = BigNumber.from(tokenId)

    const from = owner
    const value = bigTokenId.mul(1e12)

    const gasLimit = await mintContract.estimateGas.mint(owner, tokenId, {
      value,
      gasPrice,
    })

    try {
      // 1. "Idle" state
      console.log("Idle")

      // 2. "Pending" state until user signs it's Metamask
      console.log("Pending")
      const tx = await mintContract.mint(owner, tokenId, {
        value,
        from,
        gasLimit,
        gasPrice,
      })

      // 3. "Mining" state
      console.log("Mining")
      console.log("Transaction: ", tx)

      // 4. "Mined" state
      const receipt = await tx.wait()
      console.log("Mined")
      console.log("Receipt: ", receipt)

      // 5. "Confirmed" state after N blocks of confirmations since "lastBlock"
    } catch (error) {
      // *. "Error" state
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <ul>
        {/* TODO: filter "tokenIds" with "byConfirmations" of 6 blocks */}
        {tokenIds.map((tokenId) => (
          <li key={`token_id_${tokenId.toNumber()}`}>{tokenId.toNumber()}</li>
        ))}
      </ul>
      <Mint canMint={canMint} mint={mint} />
    </div>
  )
}

function Mint({
  mint,
  canMint,
}: {
  mint: (tokenId: number) => Promise<void>
  canMint: (tokenId: number) => Promise<boolean>
}) {
  const [tokenId, setTokenId] = useState<number>(0)
  const [isMintable, setIsMintable] = useState<boolean>(false)

  useEffect(() => {
    if (!tokenId) return

    async function checkIsMintable(tokenId: number) {
      const isMintable = await canMint(tokenId)

      setIsMintable(isMintable)
    }

    checkIsMintable(tokenId)
  }, [canMint, tokenId])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const tokenId = Number(event.target.value)

    if (tokenId) {
      setTokenId(tokenId)
    }
  }

  async function handleMint() {
    if (!tokenId || !isMintable) return

    mint(tokenId)
  }

  const isDisabled = !isMintable

  return (
    <div className="flex items-center space-x-2">
      <input
        className="border-2"
        type="number"
        value={tokenId}
        onChange={handleChange}
      />
      <button
        className="bg-slate-400 rounded-sm p-1 hover:cursor-pointer"
        disabled={isDisabled}
        onClick={handleMint}
      >
        Create
      </button>
    </div>
  )
}
