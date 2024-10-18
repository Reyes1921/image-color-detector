import {useEffect, useState} from "react"
import {useFileToData} from "../hooks/useFileToData"

export const useValidateFile = (loadedFile: File) => {
  const [dataUri, setDataUri] = useState<string>("/cloud-upload.svg")
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)
  const {fileToDataUri} = useFileToData()

  const validateFile = (file: File) => {
    const properData = () => {
      setDataUri("/cloud-upload.svg")
      setLoading(false)
      setLoaded(false)
    }

    setLoading(true)

    //validates if file exists
    if (!file) {
      properData()
      return
    }

    //validates files size
    if (file?.size > 1e7) {
      properData()
      setErrors("size")
      return
    }

    //encoded string file, blob
    fileToDataUri(file)
      .then((dataFileReader) => {
        setDataUri(dataFileReader)
        setLoaded(true)
        setErrors(null)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
        setErrors("size")
        properData()
      })
  }

  useEffect(() => {
    validateFile(loadedFile)
  }, [loadedFile])

  return [dataUri, loading, loaded, errors]
}
