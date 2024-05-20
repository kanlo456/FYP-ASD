import { Outlet } from "react-router-dom";
import ASDNavbar from "../components/Navbar";
import { Box } from "@mui/material";

function RootLayout() {
  return (
    <Box>
      <ASDNavbar />
      <main>
        <Outlet />
      </main>
    </Box>
  );
}

export default RootLayout;
