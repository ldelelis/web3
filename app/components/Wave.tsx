import { ReactElement } from "react"
import invariant from "tiny-invariant"

import { useAccount, useConnectMetamask, useWavePortalContract } from "~/hooks"

export default function Wave(): ReactElement {
  const connectMetamask = useConnectMetamask()
  const account = useAccount()
  const wavePortalContract = useWavePortalContract()

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  async function handleWave(): Promise<void> {
    try {
      invariant(
        wavePortalContract,
        "You must instance Wave Portal contract in order to wave",
      )

      let count = await wavePortalContract.getTotalWaves()

      const waveTxn = await wavePortalContract.wave()
      console.log("Mining...", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined -- ", waveTxn.hash)

      count = await wavePortalContract.getTotalWaves()
      console.log("Retrieved total wave count...", count.toNumber())
    } catch (error) {
      console.log(error)
    }
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
          <div className="p-2 bg-red-300">card 1</div>
          <div className="p-2 bg-red-300">card 2</div>
          <div className="p-2 bg-red-300">card 3</div>
          <div className="p-2 bg-red-300">card 4</div>
        </div>
      </div>
    </div>
  )
}
