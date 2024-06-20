import {useEffect, useState} from "react"
import {extractColors} from "extract-colors"
import {ClipboardCopy} from "@patternfly/react-core"
import Layout from "./Layout"

const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target?.result)
    }
    reader.readAsDataURL(file)
  })

interface ColorsData {
  hex: string
  red: number
  green: number
  blue: number
  hue: number
  intensity: number
  lightness: number
  saturation: number
  area: number
}

function App() {
  const [dataUri, setDataUri] = useState<any>("/placeholder.svg")
  const [color, setColor] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)

  const onChange = (file: any) => {
    setLoading(true)
    if (!file) {
      setDataUri("")
      setLoading(false)
      return
    }
    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri)
      setLoading(false)
    })
  }

  useEffect(() => {
    extractColors(dataUri).then(setColor).catch(console.error)
  }, [dataUri])

  return (
    <Layout>
      <main className="p-2">
        <h1 className="flex justify-center items-center text-4xl md:text-4xl font-bold p-10 text-sky-400">
          Image Color Detector
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col col-span-2 md:col-span-1 justify-center items-center bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 m-5 p-5 rounded-2xl ">
            <div className="p-5">
              <img
                width="200"
                height="200"
                src={dataUri}
                alt="avatar"
                className="rounded-2xl"
              />
            </div>
            <label
              htmlFor="uploadFile1"
              className="bg-transparent text-black-500 font-semibold text-base max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-black border-dashed mx-auto font-[sans-serif] p-5 rounded-2xl"
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
                accept=".png,.jpg,.svg,.webp,.gif"
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
              <p className="text-xs font-bold text-black-400 mt-2">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </label>
          </div>
          <div className="flex flex-col col-span-2 justify-start items-center borderImage bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 m-5 py-5 px-2 rounded-2xl ">
            <h3 className="text-3xl font-bold flex justify-center items-center">
              Color palette
            </h3>
            <div className="flex flex-wrap justify-around container mt-5 ">
              {loading ? (
                <span className="loader"></span>
              ) : (
                color.map((item: ColorsData, i: number) => {
                  return (
                    <div
                      key={i}
                      className="flex justify-center flex-col text-sky-400 p-3 min-w-52 rounded-xl m-1"
                      style={{backgroundColor: item.hex}}
                    >
                      <div className="flex justify-evenly">
                        <span
                          className="flex clipboard font-bold"
                          style={
                            {
                              "--light": Math.trunc(item.lightness * 100),
                            } as React.CSSProperties
                          }
                        >
                          Hex:{" "}
                        </span>
                        <ClipboardCopy
                          hoverTip="Copy"
                          clickTip="Copied"
                          variant="inline-compact"
                          isCode
                          style={
                            {
                              "--light": Math.trunc(item.lightness * 100),
                            } as React.CSSProperties
                          }
                          className="clipboard "
                        >
                          {item.hex + "  "}
                        </ClipboardCopy>
                      </div>
                      <div className="flex justify-evenly">
                        <span
                          className="flex clipboard font-bold"
                          style={
                            {
                              "--light": Math.trunc(item.lightness * 100),
                            } as React.CSSProperties
                          }
                        >
                          RGB:{" "}
                        </span>
                        <ClipboardCopy
                          hoverTip="Copy"
                          clickTip="Copied"
                          variant="inline-compact"
                          isCode
                          style={
                            {
                              "--light": Math.trunc(item.lightness * 100),
                            } as React.CSSProperties
                          }
                          className="clipboard"
                        >
                          {"rgb" +
                            "(" +
                            item.red +
                            "," +
                            item.green +
                            "," +
                            item.blue +
                            ")" +
                            " "}
                        </ClipboardCopy>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default App
