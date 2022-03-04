/* eslint-disable camelcase */
import { ReactElement } from "react"
import invariant from "tiny-invariant"
import {
  Form,
  json,
  useLoaderData,
  useActionData,
  LoaderFunction,
  ActionFunction,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "remix"

import { getHash, getIpfs, setFile } from "~/helpers"

const uploadHandler = unstable_createFileUploadHandler({
  maxFileSize: 5_000_000,
  file: ({ filename }) => filename,
})

type ActionData = {
  src?: string
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(request, uploadHandler)
  const file = formData.get("file") as File | null

  invariant(file, "The file uploaded is not correct")

  const ipfs = await getIpfs()
  const addResult = await setFile(ipfs, file)

  const src = getHash(addResult)

  return {
    src,
  }
}

type LoaderData = {
  images: string[]
}

export const loader: LoaderFunction = () => {
  const images = [
    "https://www.criptonoticias.com/wp-content/uploads/2021/11/argentina-estado-poco-capaz-buenas-peronas-vitalik-buterin-1140x570.jpg",
  ]

  return json<LoaderData>({ images })
}

export default function ImagesProject(): ReactElement {
  const { images } = useLoaderData<LoaderData>()

  return (
    <div>
      {images.map((image) => (
        <img key={image} alt="Something interesting" src={image} />
      ))}
      <Upload />
    </div>
  )
}

function Upload(): ReactElement {
  const actionData = useActionData<ActionData>()
  const src = actionData?.src

  return (
    <Form encType="multipart/form-data" method="post">
      {src ? (
        <div>
          <h3>Newly added image</h3>
          <img alt="Some cool shit" src={src} />
        </div>
      ) : null}
      <p>
        <label htmlFor="file">Choose a file</label>
        <input multiple id="file" name="file" type="file" />
      </p>
      <button aria-label="upload" name="mutation" type="submit" value="upload">
        Upload
      </button>
    </Form>
  )
}
