import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatbotPage, {
  loader as chatbotLoader,
  action as chatbotAction,
} from "./pages/Chatbot";
// import { ThemeProvider, createTheme } from "@mui/material"
import { checkAuthLoader, tokenLoader } from "./util/auth";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";

import HomePage from "./pages/Home.tsx";
import FaceDetectionPage from "./pages/FaceDetection.tsx";
import ResutlASDImagePage from "./pages/Result_Image.tsx";
import VideoDetectionPage from "./pages/VideoDetection.tsx";
import ResultVideoPage from "./pages/Result_video.tsx";
import Authentication, {
  action as loginAction,
} from "./pages/Authentication.tsx";
import VideoEYEDetectionPage from "./pages/VideoEYEDetection.tsx";
import ResutlEYEVideoPage from "./pages/ResultEYEVideoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    children: [
      {
        path: "auth",
        element: <Authentication />,
        action: loginAction,
      },
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      {
        path: "face_detection",
        element: <FaceDetectionPage />,
      },
      { path: "result_image", element: <ResutlASDImagePage /> },
      { path: "result_video", element: <ResultVideoPage /> },
      { path: "result_eye_video", element: <ResutlEYEVideoPage /> },
      {
        path: "chatbot",
        element: <ChatbotPage />,
        loader: chatbotLoader,
        action: chatbotAction,
      },
      { path: "video_detection", element: <VideoDetectionPage /> },
      { path: "video_eye_detection", element: <VideoEYEDetectionPage /> },
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
