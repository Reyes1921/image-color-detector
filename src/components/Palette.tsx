import {ClipboardCopy} from "@patternfly/react-core"
import {ColorsData} from "../interfaces/interfaces"

export const Palette = (item: ColorsData) => {
  return (
    <div
      className="flex justify-center flex-col p-1.5 rounded-xl m-1 animated zoomIn max-w-[200px] min-w-[200px]"
      style={{backgroundColor: item.hex}}
    >
      <div
        style={
          {
            "--light": Math.trunc(item.lightness * 100),
          } as React.CSSProperties
        }
        className="flex justify-evenly border-2 rounded p-1.5 mb-2 clipboard"
      >
        <span className="flex text-[10px]">Hex: </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
          className="text-[10px]"
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
        className="flex justify-evenly border-2 rounded p-2 clipboard text-[10px]"
      >
        <span className="flex text-[10px]">RGB: </span>
        <ClipboardCopy
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
          className="flex text-[10px]"
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
