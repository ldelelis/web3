import { ReactElement, useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId } from "~/types"
import { generateArrayOfNumbers } from "~/helpers"
import {
  useAccount,
  useChainId,
  useConnectMetamask,
  useWavePortalContract,
} from "~/hooks"

export default function Wave(): ReactElement {
  const [totalWaves, setTotalWaves] = useState<undefined | number>()
  // web3 hooks

  const chainId = useChainId()
  const account = useAccount()
  const connectMetamask = useConnectMetamask()
  const wavePortalContract = useWavePortalContract()

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  async function getTotalWaves(wavePortalContract: Contract): Promise<number> {
    return wavePortalContract
      .getTotalWaves()
      .then((bigTotalWaves: BigNumber) => bigTotalWaves.toNumber())
  }

  useEffect(
    function getInitialTotalWaves() {
      if (!wavePortalContract) return

      getTotalWaves(wavePortalContract).then((totalWaves) =>
        setTotalWaves(totalWaves),
      )
    },
    [wavePortalContract],
  )

  async function handleWave(): Promise<void> {
    try {
      invariant(
        wavePortalContract,
        "You must instance Wave Portal contract in order to wave",
      )

      const waveTxn = await wavePortalContract.wave()
      console.log("Mining =>", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined => ", waveTxn.hash)

      getTotalWaves(wavePortalContract).then((totalWaves) =>
        setTotalWaves(totalWaves),
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (chainId !== ChainId.Rinkeby) {
    return (
      <div>
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl">Wave at me</h1>
      <div className="flex flex-col items-stretch w-full space-y-2">
        <div className="flex justify-end items-center w-full space-x-2">
          {account ? (
            <>
              <h3>
                Connected with account{" "}
                <span className="text-indigo-500 underline underline-offset-2">
                  {account}
                </span>
              </h3>
              <button
                className="p-2 bg-indigo-500 rounded-sm text-white"
                onClick={handleWave}
              >
                Wave
              </button>
            </>
          ) : (
            <button
              className="p-2 bg-indigo-500 rounded-sm text-white"
              onClick={handleConnectMetamaskClick}
            >
              Connect wallet
            </button>
          )}
        </div>
        <div className="flex flex-col w-full space-y-2">
          {totalWaves
            ? generateArrayOfNumbers(totalWaves).map((wave) => (
                <div key={`wave_card_${wave}`} className="p-2 bg-red-300">
                  wave {wave}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
