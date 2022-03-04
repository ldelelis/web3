import { ReactElement } from "react"
import { Link, Outlet } from "remix"

export default function Index(): ReactElement {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-20">
      <nav>
        <ul className="space-x-4">
          <Link className="underline-offset-2 hover:underline" to="counter">
            Counter
          </Link>
          <Link className="underline-offset-2 hover:underline" to="waver">
            Waver
          </Link>
          <Link className="underline-offset-2 hover:underline" to="transfers">
            Transfers
          </Link>
          <Link className="underline-offset-2 hover:underline" to="mint">
            Mint
          </Link>
          <Link className="underline-offset-2 hover:underline" to="indexing">
            Indexing
          </Link>
          <Link className="underline-offset-2 hover:underline" to="dao">
            Dao
          </Link>
          <Link className="underline-offset-2 hover:underline" to="images">
            Images
          </Link>
        </ul>
      </nav>
      <div className="flex w-full flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
