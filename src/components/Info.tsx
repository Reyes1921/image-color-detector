import {useTranslation} from "react-i18next"

export const Info = () => {
  const {t} = useTranslation()
  return (
    <p className="text-sm text-sky-400 text-center p-5 font-light">
      {t("info")}
    </p>
  )
}
