import {Header, Footer} from "../components/"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="min-h-screen md:w-full bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
