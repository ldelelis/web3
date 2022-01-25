import React, { ChangeEvent, ReactElement, useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Wave } from "~/types"
import {
  useAccount,
  useChainId,
  useWaveContract,
  useConnectMetamask,
} from "~/hooks"

export default function Wave(): ReactElement {
  const [waves, setWaves] = useState<Wave[]>([])
  const [message, setMessage] = useState<string>("")
  const [wavesCount, setWavesCount] = useState<number>(0)

  const chainId = useChainId()
  const account = useAccount()
  const waveContract = useWaveContract()
  const connectMetamask = useConnectMetamask()

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value: message } = event.target

    setMessage(message)
  }

  async function getWavesCount(waveContract: Contract): Promise<number> {
    return waveContract
      .getWavesCount()
      .then((bigWavesCount: BigNumber) => bigWavesCount.toNumber())
  }

  async function getWaves(waveContract: Contract): Promise<Wave[]> {
    return waveContract.getWaves()
  }

  useEffect(
    function getInitialWaves() {
      if (!waveContract) return

      getWaves(waveContract).then(setWaves)
    },
    [waveContract],
  )

  useEffect(
    function getInitialWaves() {
      if (!waveContract) return

      getWaves(waveContract).then(setWaves)
    },
    [waveContract],
  )

  useEffect(
    function getInitialWavesCount() {
      if (!waveContract) return

      getWavesCount(waveContract).then(setWavesCount)
    },
    [waveContract],
  )

  async function handleWave(): Promise<void> {
    try {
      invariant(
        waveContract,
        "You must instance Wave Portal contract in order to wave",
      )

      const waveTxn = await waveContract.wave(message, {
        gasLimit: 300000,
      })
      console.log("Mining =>", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined => ", waveTxn.hash)

      getWavesCount(waveContract).then(setWavesCount)
      getWaves(waveContract).then(setWaves)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    function handleNewWaveEvent() {
      if (!waveContract) return

      function handleNewWave(from: string, timestamp: number, message: string) {
        console.log("handleNewWave ~ from =>", from)
        console.log("handleNewWave ~ message =>", message)
        console.log("handleNewWave ~ timestamp =>", timestamp)
        setWaves((prevWaves) => [
          ...prevWaves,
          { waver: from, timestamp, message },
        ])
      }

      waveContract.on("NewWave", handleNewWave)

      return () => {
        waveContract.off("NewWave", () => {
          console.warn(`Unsubscribed from "Increased" Counter contract's event`)
        })
      }
    },
    [waveContract],
  )

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

          <button
            className="p-2 bg-indigo-500 rounded-sm text-white"
            onClick={handleWave}
          >
            Wave
          </button>
        </div>
        <section className="flex flex-col w-full space-y-2">
          {waves
            ? waves.map(({ message, waver }, index) => (
                <article
                  key={`wave_card_${waver}_${message.slice(0, 10)}_${index}`}
                  className="p-2 bg-red-300"
                >
                  <p>
                    Waver {waver} said: {message}
                  </p>
                </article>
              ))
            : null}
        </section>
      </div>
    </div>
  )
}
