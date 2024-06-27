import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

import {Home, HomeEs} from "./pages"

const router = createBrowserRouter([
  {
    path: "/en",
    element: <Home />,
  },
  {
    path: "/es",
    element: <HomeEs />,
  },
  {
    path: "/*",
    element: <Navigate to={"/en"} />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
