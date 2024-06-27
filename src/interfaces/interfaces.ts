//API response
export interface ColorsData {
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

//OnchangeFunction
export interface ImageUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

//ClipboardConfig
export interface ColorConfig {
  textClipboard: string
}
