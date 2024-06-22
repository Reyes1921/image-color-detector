import {ClipboardCopy} from "@patternfly/react-core"

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

export const Palette = (item: ColorsData) => {
  return (
    <div
      className="flex justify-center flex-col p-2 rounded-xl m-1 animated zoomIn min-w-[210px]"
      style={{backgroundColor: item.hex}}
    >
      <div
        style={
          {
            "--light": Math.trunc(item.lightness * 100),
          } as React.CSSProperties
        }
        className="flex justify-evenly border-2 rounded p-2 mb-2 clipboard"
      >
        <span className="flex">Hex: </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
        >
          {item.hex + "  "}
        </ClipboardCopy>
      </div>
      <div
        style={
          {
            "--light": Math.trunc(item.lightness * 100),
          } as React.CSSProperties
        }
        className="flex justify-evenly border-2 rounded p-2 clipboard"
      >
        <span className="flex">RGB: </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
          className="flex"
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
}
