import {ColorsData} from "../interfaces/interfaces"
import {Clipboard} from "./Clipboard"

export const Palette = (item: ColorsData) => {
  return (
    <div
      className="flex mix-blend-lighten justify-center flex-col p-1.5 rounded-xl m-1 animated zoomIn max-w-[180px] min-w-[180px] border-2 border-sky-400"
      style={{backgroundColor: item.hex}}
    >
      <div
        style={
          {
            borderColor: item.hex,
            "--light": Math.trunc(item.lightness * 100),
          } as React.CSSProperties
        }
        className="flex justify-evenly border-2 rounded  mb-1 clipboard"
      >
        <div>
          <span className="flex text-[10px]">Hex</span>
          <Clipboard textClipboard={item?.hex} />
        </div>
      </div>
      <div
        style={
          {
            borderColor: item.hex,
            "--light": Math.trunc(item.lightness * 100),
          } as React.CSSProperties
        }
        className="flex justify-evenly border-2 rounded clipboard text-[10px]"
      >
        <div>
          <span className="flex text-[10px]">RGB </span>
          <Clipboard
            textClipboard={
              "rgb" +
              "(" +
              item.red +
              "," +
              item.green +
              "," +
              item.blue +
              ")" +
              " "
            }
          />
        </div>
      </div>
    </div>
  )
}
