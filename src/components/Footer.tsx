import {useTranslation} from "react-i18next"

export const Footer = () => {
  const {t} = useTranslation()
  const icons = [
    {
      path: t("git"),
      src: "/github.svg",
      title: "Github",
      alt: '"github logo',
    },
    {
      path: t("linkedin"),
      src: "/linkedin.svg",
      title: "Linkedin",
      alt: '"linkedin logo',
    },
    {
      path: "mailto:reyesjrondon@gmail.com",
      src: "/gmail.svg",
      title: "reyesjrondon@gmail.com",
      alt: '"gmail logo',
    },
  ]
  return (
    <footer className="md:max-w-[850px] w-full md:relative bottom-0 mx-auto left-0 right-0 footer text-sm">
      <div className="container flex justify-between items-center p-4 pt-0">
        <div className="flex">
          {icons.map((icon) => (
            <a
              href={icon.path}
              key={icon.alt}
              target="_blank"
              className="p-2 hover:scale-110 hover:opacity-70 inline-block dark:invert"
            >
              <img src={icon.src} height="12" width="20" alt={icon.alt} />
            </a>
          ))}
        </div>
        <p className="p-2 text-black dark:text-white"> Reyes Rondón</p>
      </div>
    </footer>
  )
}
