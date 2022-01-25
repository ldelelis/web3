import React, { FC, ReactElement } from "react"

import { ChainId } from "~/types"

import { useChainId } from "~/hooks"

export default function Erc20(): ReactElement {
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
