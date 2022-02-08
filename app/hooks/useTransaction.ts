import { useEffect, useState } from "react"
import { ContractTransaction, ContractReceipt } from "@ethersproject/contracts"

import { DEFAULT_BLOCK_CONFIRMATIONS } from "~/constants"
import { getErrorMessage } from "~/helpers"

export type TransactionFunction = () => Promise<ContractTransaction>
export enum TransactionStateType {
  Idle = "IDLE",
  Mined = "MINED",
  Failed = "FAILED",
  Mining = "MINING",
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
}

type TransactionState =
  | {
      state: TransactionStateType.Idle
    }
  | { state: TransactionStateType.Pending }
  | {
      state: TransactionStateType.Mining
      transaction: ContractTransaction
    }
  | {
      state: TransactionStateType.Mined
      receipt: ContractReceipt
    }
  | {
      state: TransactionStateType.Confirmed
      receipt: ContractReceipt
    }
  | {
      state: TransactionStateType.Failed
      error: string
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
  const [transactionState, setTransactionState] = useState<TransactionState>({
    state: TransactionStateType.Idle,
  })

  useEffect(() => {
    if (transactionState.state !== TransactionStateType.Mined || !blockNumber)
      return

    const receiptBlockNumber = transactionState.receipt.blockNumber
    const isConfirmed = receiptBlockNumber + blockConfirmations < blockNumber

    if (isConfirmed) {
      setTransactionState({
        state: TransactionStateType.Confirmed,
        receipt: transactionState.receipt,
      })
    }
  }, [blockConfirmations, blockNumber, transactionState])

  async function sendTransaction(transactionFunction: TransactionFunction) {
    try {
      setTransactionState({ state: TransactionStateType.Pending })

      const transaction = await transactionFunction()

      setTransactionState({ state: TransactionStateType.Mining, transaction })

      const receipt = await transaction.wait()

      setTransactionState({ state: TransactionStateType.Mined, receipt })
    } catch (error) {
      const errorMessage = getErrorMessage(error)

      setTransactionState({
        state: TransactionStateType.Failed,
        error: errorMessage,
      })
    }
  }

  return {
    sendTransaction,
    transactionState,
  }
}
