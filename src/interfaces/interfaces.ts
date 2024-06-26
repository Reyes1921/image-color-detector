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

//Colors Config
export const OptionsColorExtractor = {
  pixels: 70000,
  distance: 0.18,
}

//OnchangeFunction
export interface ImageUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}