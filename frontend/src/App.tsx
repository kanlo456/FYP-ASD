import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./pages/Root"
import ChatbotPage from "./pages/Chatbot"
import { ThemeProvider, createTheme } from "@mui/material"

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'chatbot', element: <ChatbotPage /> }
  ]
},])

const theme = createTheme(
  {
    palette: {
    }
  }
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
