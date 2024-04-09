import HomePage from "./pages/home"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./components/Root"

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [
    { index: true, element: <HomePage /> },
  ]
},])


function App() {

  return (
      <RouterProvider router={router}/>
  )
}

export default App
