import { FC, useCallback, useEffect, useState } from "react"

import { BigNumber } from "@ethersproject/bignumber"
import { Contract } from "@ethersproject/contracts"

// styles
import { useAccount, useChainId, useCounterContract } from "~/hooks"

enum ChainId {
  Rinkeby = 4,
}

const Information: FC = () => {
  const [counter, setCounter] = useState<undefined | number>(undefined)

  const account = useAccount()
  const counterContract = useCounterContract()

  function bigToString(bigNumber: BigNumber) {
    return BigNumber.from(bigNumber).toString()
  }

  const getCounterCount = useCallback(async (counterContract: Contract) => {
    if (!counterContract) return

    const bigCounterCount = await counterContract.value()
    const counter = bigToString(bigCounterCount)

    setCounter(Number(counter))
  }, [])

  useEffect(() => {
    if (!counterContract) return

    getCounterCount(counterContract)
  }, [counterContract, getCounterCount])

  useEffect(
    function handleIncreasedEvent() {
      if (!counterContract) return

      counterContract.on("Increased", (bigNextCounter) => {
        const nextCounter = bigToString(bigNextCounter)

        setCounter(Number(nextCounter))
      })

      return () => {
        counterContract.off("Increased", () => {
          console.warn(`Unsubscribed from "Increased" Counter contract's event`)
        })
      }
    },
    [counterContract, getCounterCount],
  )

  // handlers
  async function handleIncrease(): Promise<void> {
    if (!counterContract) return

    await counterContract.increase()
  }

  return (
    <div className="flex flex-col items-start">
      <button onClick={handleIncrease}>Increase</button>
      <span>Counter: {counter}</span>
      <span>Signer: {account}</span>
    </div>
  )
}

const Counter: FC = () => {
  // web3 hooks
  const chainId = useChainId()

  if (chainId !== ChainId.Rinkeby) {
    return (
      <div>
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return <Information />
}

export default Counter
