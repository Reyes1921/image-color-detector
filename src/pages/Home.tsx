import {useEffect, useRef, useState} from "react"
import {useValidateFile} from "../hooks"
import {ColorsData} from "../interfaces/interfaces"
import {dropTargetForExternal} from "@atlaskit/pragmatic-drag-and-drop/external/adapter"
import {getFiles} from "@atlaskit/pragmatic-drag-and-drop/external/file"
import {extractColors} from "extract-colors"
import {OptionsColorExtractor} from "../utils/OptionColorConfig"
import {Image} from "primereact/image"
import {Message} from "primereact/message"
import {ImageUpload, Info, Palette} from "../components"
import Layout from "../layout/Layout"
import {useTranslation} from "react-i18next"

export const Home = () => {
  const [file, setFile] = useState<File>()
  const [dataUri, loading, loaded, errors] = useValidateFile(file as File)
  const [state, setState] = useState<"normal" | "hover">("normal")
  const [color, setColor] = useState<Array<ColorsData>>([])
  const ref = useRef<HTMLDivElement | null>(null)

  let colorLoader =
    localStorage.getItem("theme") === "dark" ? "#101726" : "#e5e7eb"
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
    colorLoader =
      localStorage.getItem("theme") === "dark" ? "#101726" : "#e5e7eb"
  }

  //extract colors from encoded file,blob
  useEffect(() => {
    extractColors(dataUri as string, OptionsColorExtractor)
      .then(setColor)
      .catch(console.error)
  }, [dataUri])

  //Languages
  const {t} = useTranslation()

  return (
    <Layout>
      <main className="p-2 min-h-[calc(100vh_-_15vh)] w-full md:max-w-[1000px] mx-auto px-10 md:p-x10 md:py-2 ">
        <div className="grid grid-cols-2 md:grid-cols-3">
          <div
            ref={ref}
            className={` ${
              state === "hover"
                ? "scale-105 ease-in-out duration-500 shadow-secondary-1"
                : "ease-in-out duration-500 "
            } border-2 border-sky-400 border-dashed flex flex-col col-span-2 md:col-span-1 justify-start items-cetner m-2 p-5 rounded-2xl bg-gray-100 dark:bg-[#101726]`}
          >
            <div className="p-5 flex flex-col justify-center items-center mb-0 pb-0">
              <Image
                src={dataUri as string}
                alt="Placeholder image"
                className={`rounded-2xl min-w-[100px] min-h-[50px] [animation-duration:1s] [animation-fill-mode:both] [animation-name:zoomIn] ease-in-out duration-500 ${
                  loaded ? "block" : "hidden"
                }`}
                preview
              />
              <Image
                src="/cloud-upload.svg"
                alt="Cloud Upload Logo"
                className={` ${
                  loaded ? "hidden" : "block"
                } invert dark:invert-0`}
                preview
              />
              {
                <Message
                  severity="error"
                  className={`${
                    errors ? "flex" : "hidden"
                  } bg-[#492F3A] text-sm`}
                  text={t("error")}
                />
              }
              <span className=" text-sky-500 dark:text-sky-400 text-center mt-2">
                {t("drop")}
              </span>
              <span className=" text-sky-500 dark:text-sky-400"> {t("o")}</span>
            </div>
            <ImageUpload onChange={onChange} />
          </div>
          <div className="col-span-2 relative min-h-[450px] justify-start items-center borderImage border-2  border-sky-400 m-2 py-5 px-1 rounded-2xl bg-gray-100 dark:bg-[#101726]">
            <h3 className="text-xl font-bold flex justify-center items-center text-black dark:text-white">
              {t("palette")}
            </h3>
            <div className="flex flex-wrap justify-center items-center container mt-5">
              {loading ? (
                <span
                  style={
                    {
                      "--base-color": colorLoader,
                    } as React.CSSProperties
                  }
                  className="loader w-[60px] h-[40px] absolute before:content-[''] before:left-[0] before:top-[0] before:absolute before:w-[36px] before:h-[36px] before:rounded-[50%] before:bg-[#38bdf8] before:bg-[radial-gradient(_circle_8px_at_18px_18px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_18px_0px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_0px_18px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_36px_18px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_18px_36px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_30px_5px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_30px_5px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_30px_30px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_5px_30px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_4px_at_5px_5px,_var(--base-color)_100%,_transparent_0_)] before:bg-no-repeat before:box-border before:animate-[rotationBack_3s_linear_infinite] after:content-[''] after:left-[35px] after:top-[15px] after:absolute after:w-[24px] after:h-[24px] after:rounded-[50%] after:bg-[#38bdf8] after:bg-[radial-gradient(_circle_5px_at_12px_12px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_12px_0px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_0px_12px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_24px_12px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_12px_24px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_20px_3px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_20px_3px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_20px_20px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_3px_20px,_var(--base-color)_100%,_transparent_0_),_radial-gradient(_circle_2.5px_at_3px_3px,_var(--base-color)_100%,_transparent_0_)] after:bg-no-repeat after:box-border after:animate-[rotationBack_4s_linear_infinite_reverse] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></span>
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
