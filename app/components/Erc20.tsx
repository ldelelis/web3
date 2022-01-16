import React, { FC } from "react"
// import { BigNumber } from "@ethersproject/bignumber"
// import { Web3Provider } from "@ethersproject/providers"
// import {
//   useContractCalls,
//   ERC20Interface,
//   useEthers,
//   ChainId,
//   useBlockNumber,
// } from "@usedapp/core"

// styles
// import styles from "styles/Home.module.css"

// hooks
// import { useContractInstance } from "hooks/useContractInstance"
// import { useContractEvents } from "hooks/useContractEvent"

// const ERC20_ADDRESS = "0x1985365e9f78359a9B6AD760e32412f4a445E862"

const Erc20: FC = () => {
  // web3 hooks
  // const { chainId, account, library } = useEthers()
  // const blockNumber = useBlockNumber()

  // constants
  // const isDisconnected = !library || !account || !blockNumber

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

  // if (chainId !== ChainId.Mainnet) {
  //   return (
  //     <div className={styles.section}>
  //       <h3>This section works on Mainnet. Try changing to it from Metamask</h3>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Information />
      {/* TODO: implement getting events */}
      {/* <Transfers blockNumber={blockNumber} library={library} /> */}
    </div>
  )
}

export default Erc20

const Information: FC = () => {
  // const [_decimals, _totalSupply, _name, _symbol] =
  //   useContractCalls([
  //     {
  //       abi: ERC20Interface,
  //       address: ERC20_ADDRESS,
  //       method: "decimals",
  //       args: [],
  //     },
  //     {
  //       abi: ERC20Interface,
  //       address: ERC20_ADDRESS,
  //       method: "totalSupply",
  //       args: [],
  //     },
  //     {
  //       abi: ERC20Interface,
  //       address: ERC20_ADDRESS,
  //       method: "name",
  //       args: [],
  //     },
  //     {
  //       abi: ERC20Interface,
  //       address: ERC20_ADDRESS,
  //       method: "symbol",
  //       args: [],
  //     },
  //   ]) ?? []

  // if (!_decimals || !_symbol || !_name || !_totalSupply) {
  //   return (
  //     <div className={styles.section}>
  //       <span>Calling contract</span>
  //     </div>
  //   )
  // }

  // const [decimals] = _decimals
  // const [totalSupply] = _totalSupply
  // const [name] = _name
  // const [symbol] = _symbol

  // const bigDecimals = BigNumber.from(decimals)
  // const bigTotalSupply = BigNumber.from(totalSupply)
  // const tokens = bigTotalSupply.div(bigDecimals)
  // const totalSupplyLabel = tokens.toString()

  return (
    // <div className={styles.section}>
    //   <span>This token has {name} as it&apos;s name</span>
    //   <span>This token has {symbol} as it&apos;s symbol</span>
    //   <span>This token has {decimals} decimals</span>
    //   <span>This token has {totalSupplyLabel} tokens</span>
    // </div>
    <h3>Erc20</h3>
  )
}

// constants
// const EVENT = "Transfer"
// const BLOCKS_AMOUNT = 100

// const abi = ERC20Interface
// const address = ERC20_ADDRESS

// type TransfersProps = {
//   library: Web3Provider
//   blockNumber: number
// }

// const Transfers: FC<TransfersProps> = ({ library, blockNumber }) => {
//   // custom hooks
//   const contract = useContractInstance({ abi, address, library })
//   const events = useContractEvents({ contract, event: "Transfer" })
//   console.log("contract", contract)

//   return (
//     <div>
//       {events?.map((event) => (
//         <span key={11}>hola</span>
//       ))}
//     </div>
//   )
// }
