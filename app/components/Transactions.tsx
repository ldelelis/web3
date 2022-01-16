import React, { FC } from "react"
// import { useEthers, ChainId } from "@usedapp/core"

// styles
// import styles from "styles/Home.module.css"

const Transactions: FC = () => {
  // states
  // const [accounts, setAccounts] = useState<any[] | undefined>(undefined)

  // const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  // const provider = new Web3Provider(web3Provider)

  // web3 hooks
  // const { library } = useEthers()
  // const { chainId, library } = useEthers()

  // constants
  // const isDisconnected = !library

  // effects
  // useEffect(() => {
  //   if (library) {
  //     const getAccounts = async () => {
  //       const accounts = await library.listAccounts()
  //       console.log("getAccounts ~ accounts", accounts)

  //       return accounts
  //     }

  //     getAccounts().then((accounts) => setAccounts(accounts))
  //   }
  // }, [library])

  // if (isDisconnected) {
  //   return (
  //     <div className={styles.section}>
  //       <h3>
  //         This section that you connect your wallet. You may want to try
  //         connecting your Metamask
  //       </h3>
  //     </div>
  //   )
  // }

  // if (chainId !== ChainId.Localhost) {
  //   return (
  //     <div className={styles.section}>
  //       <h3>
  //         This section works on Localhost. Try changing to it from Metamask
  //       </h3>
  //     </div>
  //   )
  // }

  return (
    // <div className={styles.section}>
    <h3>Transactions</h3>
    // </div>
  )
}

export default Transactions
