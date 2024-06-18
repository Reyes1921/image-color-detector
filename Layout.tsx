import {Header, Footer} from "./src/components"

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="min-h-screen w-full bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-sky-500 to-sky-500">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
