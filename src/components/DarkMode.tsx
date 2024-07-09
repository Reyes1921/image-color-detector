import {useEffect, useState} from "react"
// import {setCookie, getCookie, hasCookie} from "cookies-next"

export const DarkMode = () => {
  const [isDark, setIsDark] = useState(true)

  const handleClick = () => {
    setIsDark(!isDark)
    let darkModeValue = isDark ? "light" : "dark"
    localStorage.setItem("theme", darkModeValue)
    // setCookie("theme", darkModeValue, {maxAge: 2592000})
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    }
  }, [])

  return (
    <button
      className="mr-2 md:mr-5 border-[#111827] dark:border-white rounded-lg p-0.5 hover:scale-110 hover:opacity-70"
      onClick={handleClick}
    >
      <img
        src="/sun.svg"
        alt="Sun Logo"
        width={22}
        height={22}
        className="hidden dark:flex invert"
      />
      <img
        src="/moon.svg"
        alt="Moon Logo"
        width={22}
        height={22}
        className="flex dark:hidden"
      />
    </button>
  )
}
