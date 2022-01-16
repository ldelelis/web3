import { ReactElement } from "react"
import { Link, Outlet } from "remix"

export default function Index(): ReactElement {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between p-20">
      <nav>
        <ul className="space-x-4">
          <Link className="hover:underline underline-offset-2" to="counter">
            Counter
          </Link>
          <Link className="hover:underline underline-offset-2" to="wave">
            Wave
          </Link>
        </ul>
      </nav>
      <div className="flex items-center justify-center flex-1 w-full">
        <Outlet />
      </div>
    </div>
  )
}
