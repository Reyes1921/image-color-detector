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
      className="flex justify-center flex-col p-3 min-w-52 rounded-xl m-1"
      style={{backgroundColor: item.hex}}
    >
      <div className="flex justify-evenly">
        <span
          className="flex clipboard"
          style={
            {
              "--light": Math.trunc(item.lightness * 100),
            } as React.CSSProperties
          }
        >
          Hex:{" "}
        </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
          style={
            {
              "--light": Math.trunc(item.lightness * 100),
            } as React.CSSProperties
          }
          className="clipboard "
        >
          {item.hex + "  "}
        </ClipboardCopy>
      </div>
      <div className="flex justify-evenly">
        <span
          className="flex clipboard"
          style={
            {
              "--light": Math.trunc(item.lightness * 100),
            } as React.CSSProperties
          }
        >
          RGB:{" "}
        </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
          style={
            {
              "--light": Math.trunc(item.lightness * 100),
            } as React.CSSProperties
          }
          className="clipboard"
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
