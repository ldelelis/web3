import { useEffect, useState } from "react"
import { ContractTransaction } from "@ethersproject/contracts"

import { DEFAULT_BLOCK_CONFIRMATIONS } from "~/constants"

export type TransactionFunction = () => Promise<ContractTransaction>
export enum TransactionState {
  Idle = "IDLE",
  Mined = "MINED",
  Failed = "FAILED",
  Mining = "MINING",
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
}

export function useTransaction({
  blockNumber,
  blockConfirmations = DEFAULT_BLOCK_CONFIRMATIONS,
}: {
  blockNumber?: number
  blockConfirmations?: number
}): {
  sendTransaction: (transactionFunction: TransactionFunction) => Promise<void>
  transactionState: TransactionState
} {
  const [transactionState, setTransactionState] = useState<TransactionState>(
    TransactionState.Idle,
  )
  const [receiptBlockNumber, setReceiptBlockNumber] = useState<
    number | undefined
  >(undefined)

  useEffect(() => {
    if (!receiptBlockNumber || !blockNumber) return

    const isConfirmed = receiptBlockNumber + blockConfirmations < blockNumber

    if (isConfirmed) {
      setTransactionState(TransactionState.Confirmed)
    }
  }, [blockConfirmations, blockNumber, receiptBlockNumber])

  async function sendTransaction(transactionFunction: TransactionFunction) {
    try {
      setTransactionState(TransactionState.Pending)

      const transaction = await transactionFunction()
      console.log("Transaction: ", transaction)

      setTransactionState(TransactionState.Mining)

      const receipt = await transaction.wait()
      console.log("Receipt: ", receipt)

      setTransactionState(TransactionState.Mined)
      setReceiptBlockNumber(receipt.blockNumber)
    } catch (error) {
      setTransactionState(TransactionState.Failed)
      console.error(error)
    }
  }

  return {
    sendTransaction,
    transactionState,
  }
}
