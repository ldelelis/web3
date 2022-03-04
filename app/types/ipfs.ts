import type { CID } from "ipfs-core"
import type { Mtime } from "ipfs-unixfs"

export type AddResult = {
  cid: CID
  size: number
  path: string
  mode?: number
  mtime?: Mtime
}
