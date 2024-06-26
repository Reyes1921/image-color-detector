import {ImageUploadProps} from "../interfaces/interfaces"

export const ImageUpload: React.FC<ImageUploadProps> = ({onChange}) => {
  return (
    <div className="bg-transparent text-black-500 font-semibold text-sm max-w-md flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif] p-2 rounded-2xl">
      <label
        htmlFor="uploadFile1"
        className="flex bg-gray-800 hover:bg-gray-700  text-sky-400 text-base px-5 py-2  mt-0 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
      >
        <img
          src="/cloud-upload.svg"
          alt="Cloud Upload"
          width={20}
          height={20}
          className="mr-2"
        />
        Upload a File
        <input
          type="file"
          id="uploadFile1"
          accept=".png,.jpg,.svg,.webp,.gif,.jpeg"
          className="hidden"
          onChange={onChange}
        />
      </label>
      <span className="text-xs font-thin mt-2 text-sky-400">10Mb Max</span>
      <p className="text-xs font-bold  text-sky-400 mt-2 text-center">
        PNG, JPG, JPEG, SVG, WEBP, and GIF are Allowed.
      </p>
    </div>
  )
}
