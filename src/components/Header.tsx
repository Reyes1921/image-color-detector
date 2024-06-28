import {useTranslation} from "react-i18next"
import {SelectButton, SelectButtonChangeEvent} from "primereact/selectbutton"
import {useEffect, useState} from "react"

export const Header = () => {
  const {i18n} = useTranslation()
  const options = ["en", "es"]
  const [value, setValue] = useState<string>(options[0])
  const onChangeLang = (e: SelectButtonChangeEvent) => {
    const lang_code = e.target.value
    i18n.changeLanguage(lang_code)
    setValue(e.target.value)
    localStorage.setItem("language", e.target.value)
  }

  useEffect(() => {
    const lang = localStorage.getItem("language") as string
    if (!!lang) {
      i18n.changeLanguage(lang)
      setValue(lang)
    }
  }, [])

  return (
    <header className="w-full md:max-w-[1000px] mx-auto">
      <div className="flex justify-around items-center  px-10 flex-col md:flex-row py-6 md:p-5">
        <div>
          <h1 className="text-left text-xl md:text-2xl font-bold text-sky-400 pb-5 md:pb-0">
            Image Color Detector
          </h1>
        </div>

        <div className="">
          <nav className="flex justify-end items-center">
            <SelectButton
              value={value}
              onChange={onChangeLang}
              options={options}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
