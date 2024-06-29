import {ImageUploadProps} from "../interfaces/interfaces"
import {useTranslation} from "react-i18next"

export const ImageUpload: React.FC<ImageUploadProps> = ({onChange}) => {
  const {t} = useTranslation()
  return (
    <div className="bg-transparent text-black-500 font-semibold text-sm max-w-md flex flex-col items-center justify-center cursor-pointer  font-[sans-serif] p-5 rounded-2xl">
      <label
        htmlFor="uploadFile1"
        className="flex bg-gray-800 hover:bg-gray-700  text-white text-base px-3 py-2  mt-0 outline-none rounded w-max cursor-pointer  font-[sans-serif]"
      >
        <img
          src="/cloud-upload.svg"
          alt="Cloud Upload"
          width={20}
          height={20}
          className="mr-2"
        />
        {t("upload")}
        <input
          type="file"
          id="uploadFile1"
          accept=".png,.jpg,.svg,.webp,.gif,.jpeg"
          className="hidden"
          onChange={onChange}
        />
      </label>
      <span className="text-xs font-thin mt-2 text-sky-400">{t("mb")}</span>
      <p className="text-xs font-bold  text-white mt-2 text-center">
        {t("types")}
      </p>
    </div>
  )
}
