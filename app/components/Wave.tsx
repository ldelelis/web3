import React, { ChangeEvent, ReactElement, useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Wave } from "~/types"
import {
  useAccount,
  useChainId,
  useConnectMetamask,
  useWavePortalContract,
} from "~/hooks"

export default function Wave(): ReactElement {
  const [waves, setWaves] = useState<Wave[] | undefined>(undefined)
  const [message, setMessage] = useState<string>("")
  const [wavesCount, setWavesCount] = useState<number>(0)

  const chainId = useChainId()
  const account = useAccount()
  const connectMetamask = useConnectMetamask()
  const wavePortalContract = useWavePortalContract()

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value: message } = event.target

    setMessage(message)
  }

  async function getWavesCount(wavePortalContract: Contract): Promise<number> {
    return wavePortalContract
      .getWavesCount()
      .then((bigWavesCount: BigNumber) => bigWavesCount.toNumber())
  }

  async function getWaves(wavePortalContract: Contract): Promise<Wave[]> {
    return wavePortalContract.getWaves()
  }

  useEffect(
    function getInitialWaves() {
      if (!wavePortalContract) return

      getWaves(wavePortalContract).then(setWaves)
    },
    [wavePortalContract],
  )

  useEffect(
    function getInitialWavesCount() {
      if (!wavePortalContract) return

      getWavesCount(wavePortalContract).then(setWavesCount)
    },
    [wavePortalContract],
  )

  async function handleWave(): Promise<void> {
    try {
      invariant(
        wavePortalContract,
        "You must instance Wave Portal contract in order to wave",
      )

      const waveTxn = await wavePortalContract.wave(message)
      console.log("Mining =>", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined => ", waveTxn.hash)

      getWavesCount(wavePortalContract).then(setWavesCount)
      getWaves(wavePortalContract).then(setWaves)
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
      <h3>I have been waved {wavesCount} times</h3>
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
        <div className="flex justify-end items-center space-x-2">
          <label aria-label="message" htmlFor="message">
            Add your message:
          </label>
          <input
            className="border-2 border-indigo-500 w-72 h-10 p-2"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <section className="flex flex-col w-full space-y-2">
          {waves
            ? waves.map(({ message, waver }) => (
                <article
                  key={`wave_card_${waver}_${message.slice(0, 10)}`}
                  className="p-2 bg-red-300"
                >
                  <text>
                    Waver {waver} said: {message}
                  </text>
                </article>
              ))
            : null}
        </section>
      </div>
    </div>
  )
}
