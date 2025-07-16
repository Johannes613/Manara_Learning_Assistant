import React, { useState } from "react";
import { Box } from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 240;

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Topbar
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: "64px", // Offset for Topbar
          scrollBehavior: "smooth",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
