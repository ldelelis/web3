import { ReactElement } from "react"
import { json, LoaderFunction, useLoaderData } from "remix"

type LoaderData = {
  transfers: any[]
}

export const loader: LoaderFunction = () => {
  const transfers: any[] = []

  return json<LoaderData>({ transfers })
}

export default function IndexingProject(): ReactElement {
  const { transfers } = useLoaderData<LoaderData>()

  return (
    <div>
      <h1>IndexingProject</h1>
      {transfers.map((transfer) => (
        <span key={transfer.address}>{transfer.address}</span>
      ))}
    </div>
  )
}
