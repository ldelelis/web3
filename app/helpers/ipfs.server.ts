import { create } from "ipfs-core"
import type { CID, IPFS } from "ipfs-core"

import { AddResult } from "~/types"

export function getUrl(addResult: AddResult): string {
  const IPFS_GATEWAY = "https://ipfs.io/ipfs/"
  const hash = addResult.cid.toV1()
  const url = IPFS_GATEWAY + hash

  return url
}

// 1. setFile
export async function setFile(ipfs: IPFS, file: File): Promise<AddResult> {
  const buffer = await file.arrayBuffer()

  const addResult = await ipfs.add({
    path: file.name,
    content: buffer,
  })

  return addResult
}

// 2. getFile
// export async function getFile(ipfs: IPFS, cid: CID): Promise<File> {}

// 3. setString
export async function setString(
  ipfs: IPFS,
  path: string,
  string: string,
): Promise<AddResult> {
  const textEncoder = new TextEncoder()

  const uint8Array = textEncoder.encode(string)

  const addResult = await ipfs.add({
    path,
    content: uint8Array,
  })

  return addResult
}

// 4. getString
export async function getString(ipfs: IPFS, cid: CID): Promise<string> {
  const decoder = new TextDecoder()
  const uint8Array = ipfs.cat(cid)

  let string = ""
  for await (const chunk of uint8Array) {
    console.log("forawait ~ decoder.decode(chunk)", decoder.decode(chunk))
    string += decoder.decode(chunk)
  }

  console.log("forawait ~ string", string)

  return string
}

// 5. setJson
// export async function setJson(ipfs: IPFS, file: File): Promise<AddResult> {}

// 6. getJson
// export async function getJson(ipfs: IPFS, cid: CID): Promise<JSON> {}

//////////////////////////////////////
//// Setting IPFS in global object
//////////////////////////////////////

declare global {
  // eslint-disable-next-line no-var
  var __ipfs: IPFS | undefined
}

export async function getIpfs(): Promise<IPFS> {
  if (global.__ipfs) {
    return global.__ipfs
  }

  const ipfs = await create()

  global.__ipfs = ipfs

  return global.__ipfs
}
