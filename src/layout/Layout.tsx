import {Header, Footer} from "../components/"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="min-h-screen md:w-full bg-white dark:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
