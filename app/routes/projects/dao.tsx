import { ReactElement } from "react"

import { useAccount, useConnectMetamask, useMetamask } from "~/hooks"

export default function DaoProject(): ReactElement {
  const metamask = useMetamask()
  const account = useAccount({ metamask })
  const connectMetamask = useConnectMetamask()

  function handleConnectClick() {
    connectMetamask()
  }

  if (!account) {
    return (
      <div>
        <h1>MemeDAO</h1>
        <button onClick={handleConnectClick}>Connect your wallet</button>
      </div>
    )
  }

  return <h1>Wallet connected</h1>
}
