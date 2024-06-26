import {CustomZoomContentProps} from "../interfaces/interfaces"

export const zoom = () => {
  const CustomZoomContent = ({
    buttonUnzoom, // default unzoom button
    img, // your image, prepped for zooming
  }: CustomZoomContentProps) => {
    return (
      <div className="bg-black w-full">
        {buttonUnzoom}
        <figure className="bg-black">{img}</figure>
      </div>
    )
  }
  return [CustomZoomContent]
}
