export const useFileToData = (): {
  fileToDataUri: (file: File) => Promise<string>
} => {
  const fileToDataUri = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target?.result as string)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(file)
    })

  return {fileToDataUri}
}
