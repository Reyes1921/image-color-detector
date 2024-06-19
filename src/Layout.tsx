import {Header, Footer} from "./components"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
