import { ReactElement } from "react"
import { useAccount, useConnectMetamask } from "~/hooks"

export default function Wave(): ReactElement {
  const connectMetamask = useConnectMetamask()
  const account = useAccount()

  async function handleConnectMetamaskClick(): Promise<void> {
    connectMetamask()
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl">Wave at me</h1>
      <div className="flex flex-col items-stretch w-full space-y-2">
        <div className="flex justify-end items-center w-full">
          {account ? (
            <h3>
              Connected to{" "}
              <span className="text-indigo-500 underline underline-offset-2">
                {account}
              </span>
            </h3>
          ) : (
            <button
              className="p-2 bg-indigo-500 rounded-sm text-white"
              onClick={handleConnectMetamaskClick}
            >
              Connect wallet
            </button>
          )}
        </div>
        <div className="flex flex-col w-full space-y-2">
          <div className="p-2 bg-red-300">card 1</div>
          <div className="p-2 bg-red-300">card 2</div>
          <div className="p-2 bg-red-300">card 3</div>
          <div className="p-2 bg-red-300">card 4</div>
        </div>
      </div>
    </div>
  )
}
