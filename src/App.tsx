import {useEffect, useState, useRef} from "react"
import {extractColors} from "extract-colors"
import Layout from "./Layout"
import {Palette} from "./components"
import Swal from "sweetalert2"
import {dropTargetForExternal} from "@atlaskit/pragmatic-drag-and-drop/external/adapter"
import {getFiles} from "@atlaskit/pragmatic-drag-and-drop/external/file"
import {useFileToData} from "./hooks"

//API response
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

//Colors Config
const options = {
  pixels: 70000,
  distance: 0.18,
}

function App() {
  const [dataUri, setDataUri] = useState<string>("/placeholder.svg")
  const [color, setColor] = useState<Array<ColorsData>>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const {fileToDataUri} = useFileToData()

  useEffect(() => {
    const el = ref.current
    if (!el) {
      throw new Error("ref not set correctly")
    }
    dropTargetForExternal({
      element: el,
      onDrop({source}) {
        const files: File[] = getFiles({source})
        setDataUri(files[0].name)
      },
    })
  }, [])

  const onChange = (file: any) => {
    setLoading(true)
    if (!file) {
      if (file?.size > 1e7) {
        Swal.fire({
          title: "Error!",
          text: "Please upload an image smaller than 100mb",
          icon: "error",
          confirmButtonText: "Ok",
        })
        setLoading(false)
        setLoaded(false)
        return
      }
      setDataUri("/cloud-upload.svg")
      setLoading(false)
      setLoaded(false)
      return
    }

    fileToDataUri(file).then((dataFileReader) => {
      setDataUri(dataFileReader)
      setLoaded(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }

  useEffect(() => {
    extractColors(dataUri, options).then(setColor).catch(console.error)
  }, [dataUri])

  return (
    <Layout>
      <main className="p-2 min-h-screen main w-full md:max-w-[1000px] mx-auto">
        <h1 className="text-center text-xl md:text-2xl font-bold p-8 text-sky-400">
          Image Color Detector
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div
            ref={ref}
            className="flex flex-col col-span-2 md:col-span-1 justify-start items-cetner bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 m-5 p-5 rounded-2xl first-palette"
          >
            <div className="p-5 flex justify-center items-center">
              <img
                src={dataUri}
                alt="Placeholder image"
                className={`rounded-2xl max-w-[400] max-h-[300] animated zoomIn ${
                  loaded ? "block" : "hidden"
                }`}
              />
              <img
                src="/cloud-upload.svg"
                alt="Cloud Upload Logo"
                className={`${loaded ? "hidden" : "block"}`}
              />
            </div>
            <div className="bg-transparent text-black-500 font-semibold text-sm max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-black border-dashed mx-auto font-[sans-serif] p-2 rounded-2xl">
              <label
                htmlFor="uploadFile1"
                className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 mr-2 fill-white inline"
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
                Upload
                <input
                  type="file"
                  id="uploadFile1"
                  accept=".png,.jpg,.svg,.webp,.gif,.jpeg"
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
              </label>
              <span className="text-xs font-thin mt-2">10Mb Max</span>
              <p className="text-xs font-bold text-black-400 mt-2 text-center">
                PNG, JPG, JPEG, SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
          </div>
          <div className="col-span-2 relative min-h-[450px] justify-start items-center borderImage bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 m-2 py-5 px-2 rounded-2xl ">
            <h3 className="text-xl font-bold flex justify-center items-center">
              Color palette
            </h3>
            <div className="flex flex-wrap justify-center items-center container mt-5">
              {loading ? (
                <span className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              ) : (
                color.map((item: ColorsData, i) => {
                  return <Palette {...item} key={i} />
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
