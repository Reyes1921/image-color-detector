import Layout from "./Layout"
import {useEffect, useState, useRef} from "react"
import {Info, Palette, ImageUpload} from "./components"
import {dropTargetForExternal} from "@atlaskit/pragmatic-drag-and-drop/external/adapter"
import {useValidateFile} from "./hooks"
import {getFiles} from "@atlaskit/pragmatic-drag-and-drop/external/file"
import {extractColors} from "extract-colors"
import {ColorsData} from "./interfaces/interfaces"
import {Message} from "primereact/message"
import {Image} from "primereact/image"
import {OptionsColorExtractor} from "./utils/OptionColorConfig"

function App() {
  const [file, setFile] = useState<File>()
  const [dataUri, loading, loaded, errors] = useValidateFile(file as File)
  const [state, setState] = useState<"normal" | "hover">("normal")
  const [color, setColor] = useState<Array<ColorsData>>([])
  const ref = useRef<HTMLDivElement | null>(null)

  //read drag and drop file
  useEffect(() => {
    const el = ref.current
    if (!el) {
      throw new Error("ref not set correctly")
    }
    dropTargetForExternal({
      element: el,
      onDrop({source}) {
        const files: File[] = getFiles({source})
        setFile(files[0])
        setState("normal")
      },
      onDragEnter: () => setState("hover"),
      onDragLeave: () => setState("normal"),
    })
  }, [])

  //read file in input
  const onChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const laodedFile = file.target.files?.[0]
    setFile(laodedFile)
  }

  //extract colors from encoded file,blob
  useEffect(() => {
    extractColors(dataUri as string, OptionsColorExtractor)
      .then(setColor)
      .catch(console.error)
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
            className={` ${
              state === "hover"
                ? "scale-105 ease-in-out duration-500 shadow-secondary-1"
                : "ease-in-out duration-500 "
            } border-2 border-sky-400 border-dashed flex flex-col col-span-2 md:col-span-1 justify-start items-cetner m-2 p-5 rounded-2xl first-palette bg-[#101726]`}
          >
            <div className="p-5 flex flex-col justify-center items-center mb-0 pb-0">
              <Image
                src={dataUri as string}
                alt="Placeholder image"
                className={`rounded-2xl max-w-[400] max-h-[300] animated zoomIn ease-in-out duration-500 ${
                  loaded ? "block" : "hidden"
                }`}
                preview
              />
              <Image
                src="/cloud-upload.svg"
                alt="Cloud Upload Logo"
                className={` ${loaded ? "hidden" : "block"}`}
                preview
              />
              {
                <Message
                  severity="error"
                  className={`${
                    errors ? "flex" : "hidden"
                  } bg-[#492F3A] text-sm`}
                  text="Error on Upload"
                />
              }
              <span className=" text-sky-400 text-center mt-2">
                Drop an Image
              </span>
              <span className=" text-sky-400">or</span>
            </div>
            <ImageUpload onChange={onChange} />
          </div>
          <div className="col-span-2 relative min-h-[450px] justify-start items-center borderImage border-2 border-sky-400 m-2 py-5 px-1 rounded-2xl bg-[#101726]">
            <h3 className="text-xl font-bold flex justify-center items-center text-sky-400">
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
        <Info />
      </main>
    </Layout>
  )
}

export default App
