import { ReactElement } from "react"
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix"
import type { MetaFunction } from "remix"

import appStyles from "~/styles/app.css"

export const meta: MetaFunction = () => {
  return { title: "Web3 sides" }
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: appStyles }]
}

export default function App(): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
