import { ReactElement, useEffect, useState } from "react"

import { BigNumber } from "@ethersproject/bignumber"
import { Contract } from "@ethersproject/contracts"

import { ChainId } from "~/types"
import { useAccount, useChainId, useCounterContract } from "~/hooks"

export function Counter(): ReactElement {
  const chainId = useChainId()

  const isRinkeby = chainId !== ChainId.Rinkeby

  if (!isRinkeby) {
    return (
      <div>
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  return <Information />
}

function Information(): ReactElement {
  const [counter, setCounter] = useState<undefined | number>(undefined)

  const account = useAccount()
  const counterContract = useCounterContract()

  function bigToString(bigNumber: BigNumber) {
    return BigNumber.from(bigNumber).toString()
  }

  useEffect(() => {
    if (!counterContract) return

    async function getCounterCount(counterContract: Contract) {
      if (!counterContract) return

      const bigCounterCount = await counterContract.value()
      const counter = bigToString(bigCounterCount)

      setCounter(Number(counter))
    }

    getCounterCount(counterContract)
  }, [counterContract])

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
    [counterContract],
  )

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
