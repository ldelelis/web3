import { ChangeEvent, ReactElement, useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { BigNumber } from "@ethersproject/bignumber"

import { ChainId, Wave, Waver as WaverContract } from "~/types"
import {
  useAccount,
  useChainId,
  useMetamask,
  useWaverContract,
  useConnectMetamask,
} from "~/hooks"

export default function Waver(): ReactElement {
  const [waves, setWaves] = useState<Wave[]>([])
  const [message, setMessage] = useState<string>("")
  const [wavesCount, setWavesCount] = useState<number>(0)

  const metamask = useMetamask()
  const chainId = useChainId({ metamask })
  const account = useAccount({ metamask })
  const waverContract = useWaverContract()
  const connectMetamask = useConnectMetamask()

  const isRinkeby = chainId === ChainId.Rinkeby

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value: message } = event.target

    setMessage(message)
  }

  async function getWavesCount(waverContract: WaverContract): Promise<number> {
    return waverContract
      .getWavesCount()
      .then((bigWavesCount: BigNumber) => bigWavesCount.toNumber())
  }

  async function getWaves(waverContract: WaverContract): Promise<Wave[]> {
    return waverContract.getWaves()
  }

  useEffect(
    function getInitialWaves() {
      if (!waverContract) return

      getWaves(waverContract).then(setWaves)
    },
    [waverContract],
  )

  useEffect(
    function getInitialWaves() {
      if (!waverContract) return

      getWaves(waverContract).then(setWaves)
    },
    [waverContract],
  )

  useEffect(
    function getInitialWavesCount() {
      if (!waverContract) return

      getWavesCount(waverContract).then(setWavesCount)
    },
    [waverContract],
  )

  async function handleWave(): Promise<void> {
    try {
      invariant(
        waverContract,
        "You must instance Wave Portal contract in order to wave",
      )

      const waveTxn = await waverContract.wave(message, {
        gasLimit: 300000,
      })
      console.log("Mining =>", waveTxn.hash)

      await waveTxn.wait()
      console.log("Mined => ", waveTxn.hash)

      getWavesCount(waverContract).then(setWavesCount)
      getWaves(waverContract).then(setWaves)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    function handleNewWaveEvent() {
      if (!waverContract) return

      function handleNewWave(
        from: string,
        timestamp: BigNumber,
        message: string,
      ) {
        setWaves((prevWaves) => [
          ...prevWaves,
          { waver: from, timestamp, message },
        ])
      }

      waverContract.on("NewWave", handleNewWave)

      return () => {
        waverContract.off("NewWave", () => {
          console.warn(`Unsubscribed from "Increased" Counter contract's event`)
        })
      }
    },
    [waverContract],
  )

  if (!isRinkeby) {
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
