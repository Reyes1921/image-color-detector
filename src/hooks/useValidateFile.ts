import {useEffect, useState} from "react"
import {useFileToData} from "../hooks/useFileToData"
import Swal from "sweetalert2"

export const useValidateFile = (loadedFile: File) => {
  const [dataUri, setDataUri] = useState<string>("/cloud-upload.svg")
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const {fileToDataUri} = useFileToData()

  const validateFile = (file: File) => {
    const currentFile = file as File
    setLoading(true)
    //validates if file exists
    if (!file) {
      //validates files size
      if (currentFile?.size > 100) {
        Swal.fire({
          title: "Error!",
          text: "Please upload an image smaller than 100mb",
          icon: "error",
          confirmButtonText: "Ok",
        })
        setDataUri("/cloud-upload.svg")
        setLoading(false)
        setLoaded(false)
        return
      }
      setDataUri("/cloud-upload.svg")
      setLoading(false)
      setLoaded(false)
      return
    }

    //encoded string file, blob
    fileToDataUri(currentFile)
      .then((dataFileReader) => {
        setDataUri(dataFileReader)
        setLoaded(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
        Swal.fire({
          title: "Error!",
          text: "Upload a file compatible with one of these file types PNG, JPG, JPEG, SVG, WEBP, and GIF.",
          icon: "error",
          confirmButtonText: "Ok",
        })
        setDataUri("/cloud-upload.svg")
        setLoading(false)
        setLoaded(false)
      })
  }

  useEffect(() => {
    validateFile(loadedFile)
  }, [loadedFile])

  return [dataUri, loading, loaded]
}
