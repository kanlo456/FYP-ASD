import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatbotPage, { actions as chatBotAction } from "./pages/Chatbot";
// import { ThemeProvider, createTheme } from "@mui/material"

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";

import HomePage from "./pages/Home.tsx";
import FaceDetectionPage from "./pages/FaceDetection.tsx";
import ResutlASDImagePage from "./pages/Result_Image.tsx";
import VideoDetectionPage from "./pages/VideoDetection.tsx";
import ResultVideoPage from "./pages/Result_video.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "face_detection",
        element: <FaceDetectionPage />,
      },
      { path: "result_image", element: <ResutlASDImagePage /> },
      { path: "result_video", element: <ResultVideoPage /> },
      { path: "chatbot", element: <ChatbotPage />, action: chatBotAction },
      { path: "video_detection", element: <VideoDetectionPage /> },
    ],
  },
]);

// const theme = createTheme(
//   {
//     palette: {
//     }
//   }
// )

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme}> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}

export default App;
