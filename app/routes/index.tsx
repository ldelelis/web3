import { ReactElement } from "react"
import { Link } from "remix"

export default function Index(): ReactElement {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-20">
      <nav>
        <ul className="space-x-4">
          <Link className="hover:underline underline-offset-2" to="/intro">
            Intro
          </Link>
          <Link className="hover:underline underline-offset-2" to="/projects">
            Projects
          </Link>
        </ul>
      </nav>
    </div>
  )
}
