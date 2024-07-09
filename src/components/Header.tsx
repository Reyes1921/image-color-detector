import {useTranslation} from "react-i18next"
import {SelectButton, SelectButtonChangeEvent} from "primereact/selectbutton"
import {useEffect, useState} from "react"
import {DarkMode} from "./DarkMode"

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
      <div className="flex justify-between items-center px-10 flex-col md:flex-row py-6 md:p-5">
        <div className="md:ml-10">
          <h1 className="text-center md:text-left text-xl md:text-2xl font-bold text-black dark:text-white pb-5 md:pb-0">
            Image Color Detector
          </h1>
        </div>

        <div className="flex md:mr-5">
          <nav className="flex justify-end items-center mr-3">
            <SelectButton
              value={value}
              onChange={onChangeLang}
              options={options}
            />
          </nav>
          <DarkMode />
        </div>
      </div>
    </header>
  )
}
