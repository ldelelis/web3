import React, { FC } from "react"
import { Interface } from "@ethersproject/abi"
import { BigNumber } from "@ethersproject/bignumber"
import { Contract } from "@ethersproject/contracts"
import {
  ChainId,
  useEthers,
  useContractCall,
  useContractFunction,
} from "@usedapp/core"

// build
// import COUNTER_ABI from "artifacts/Counter.json"

// styles
import styles from "styles/Home.module.css"

type Props = {
  contract: Contract
}

const Information: FC<Props> = ({ contract }) => {
  // web3 hooks
  const { account } = useEthers()

  // constants
  const COUNTER_ADDRESS = "0x1D2561D18dD2fc204CcC8831026d28375065ed53"
  const counterInterface = new Interface([])

  // contract hooks
  const [bigCounter] =
    useContractCall({
      abi: counterInterface,
      address: COUNTER_ADDRESS,
      method: "value",
      args: [],
    }) ?? []

  const { send } = useContractFunction(contract, "increase", {
    transactionName: "Increase count",
  })

  // constants
  const counter = bigCounter ? BigNumber.from(bigCounter).toString() : 0

  // handlers
  const handleIncrease = () => send()

  return (
    <div className={styles.section}>
      <button onClick={handleIncrease}>Increase</button>
      <span>Counter: {counter}</span>
      <span>Signer: {account}</span>
    </div>
  )
}

const Counter: FC = () => {
  // web3 hooks
  const { activateBrowserWallet, account, chainId } = useEthers()

  // constants
  // const COUNTER_ADDRESS = "0x1D2561D18dD2fc204CcC8831026d28375065ed53"
  const contract = undefined
  // const contract = library
  //   ? new Contract(COUNTER_ADDRESS, COUNTER_ABI, library)
  //   : undefined

  // handlers
  const handleOpenWallet = () => activateBrowserWallet()

  if (chainId !== ChainId.Rinkeby) {
    return (
      <div className={styles.section}>
        <h3>This section works on Rinkeby. Try changing to it from Metamask</h3>
      </div>
    )
  }

  if (!account || !contract) {
    return (
      <div className={styles.section}>
        <button onClick={handleOpenWallet}>Open wallet</button>
        <h3>Connect the provider</h3>
      </div>
    )
  }

  return <Information contract={contract} />
}

export default Counter
