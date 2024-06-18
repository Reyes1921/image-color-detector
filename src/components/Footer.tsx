export const Footer = () => {
  const icons = [
    {
      path: "https://github.com/Reyes1921",
      src: "/github.svg",
      title: "Github",
      alt: '"github logo',
    },
    {
      path: "https://www.linkedin.com/in/reyes-rondon/?locale=en_US",
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
    <footer className="w-full md:max-w-[850px] mx-auto">
      <div className="container flex justify-between items-center p-4 pt-0">
        <div className="flex">
          {icons.map((icon) => (
            <a
              href={icon.path}
              key={icon.alt}
              target="_blank"
              className="p-2 hover:scale-110 hover:opacity-70 inline-block"
            >
              <img src={icon.src} height="12" width="20" alt={icon.alt} />
            </a>
          ))}
        </div>
        <p className="p-2"> Reyes Rondón</p>
      </div>
    </footer>
  )
}
