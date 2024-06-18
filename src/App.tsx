import {useEffect, useState} from "react"
import {extractColors} from "extract-colors"
import Layout from "../Layout"

const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target?.result)
    }
    reader.readAsDataURL(file)
  })

function App() {
  const [dataUri, setDataUri] = useState<any>("")

  const onChange = (file: any) => {
    if (!file) {
      setDataUri("")
      return
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri)
    })
  }

  useEffect(() => {
    extractColors(dataUri).then(console.log).catch(console.error)
  }, [dataUri])

  return (
    <Layout>
      <main className="grid grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <div className="p-10">
            <img width="200" height="200" src={dataUri} alt="avatar" />
          </div>
          <label
            htmlFor="uploadFile1"
            className="bg-transparent text-black-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-black border-dashed mx-auto font-[sans-serif] p-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-black-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload file
            <input
              type="file"
              id="uploadFile1"
              className="hidden"
              onChange={(event) => {
                const target = event.target as HTMLInputElement

                if (target.files) {
                  onChange(target.files[0])
                } else {
                  onChange(null)
                }
              }}
            />
            <p className="text-xs font-medium text-black-400 mt-2">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
        </div>

        <div className="flex flex-col justify-center items-center">RESULTS</div>
      </main>
    </Layout>
  )
}

export default App
