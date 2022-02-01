import { useEffect, useState } from "react"

import { useAlchemy } from "~/hooks"

export function useBlockNumber(): number | undefined {
  const [blockNumber, setBlockNumber] = useState<undefined | number>(undefined)
  const alchemy = useAlchemy()

  useEffect(
    function getInitialBlockNumber() {
      async function call() {
        const blockNumber = await alchemy.getBlockNumber()

        setBlockNumber(blockNumber)
      }

      call()
    },
    [alchemy],
  )

  // TODO: listen to "block" event
  // useEffect(
  //   function listenBlockEvent() {
  //     function handleBlockNumber(blockNumber: number) {
  //       setBlockNumber(blockNumber)
  //     }

  //     alchemy.on("block", handleBlockNumber)

  //     return () => {
  //       alchemy.off("block", () => {
  //         console.warn(`Unsubscribed from "block" Web3Provider event`)
  //       })
  //     }
  //   },
  //   [alchemy],
  // )

  return blockNumber
}
