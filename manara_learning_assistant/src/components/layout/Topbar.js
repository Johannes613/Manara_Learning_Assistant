import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Language,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { useAuth } from "../../contexts/AuthContext"; // Import the useAuth hook

const Topbar = ({ drawerWidth, onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const { mode, toggleThemeMode } = useContext(ThemeModeContext);

  // Destructure currentUser and logout directly from the context
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from the context
      navigate("/signin"); // Redirect on successful logout
    } catch (error) {
      console.error("Failed to log out", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: mode === "dark" ? "#1D2020" : "#F4F7F6",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon sx={{ color: "text.primary" }} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          variant="standard"
          disableUnderline
          IconComponent={Language}
          sx={{ mx: 1, color: "text.primary" }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ar">AR</MenuItem>
        </Select>

        <IconButton
          sx={{ mx: 1 }}
          onClick={() => toggleThemeMode(mode === "dark" ? "light" : "dark")}
          color="inherit"
        >
          {mode === "dark" ? (
            <Brightness7 sx={{ color: "text.primary" }} />
          ) : (
            <Brightness4 sx={{ color: "text.primary" }} />
          )}
        </IconButton>

        {currentUser ? (
          <>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleLogout}
              sx={{ borderRadius: "20px", color: "white" }}
            >
              {t("topbar.logout")}
            </Button>
          </>
        ) : (
          <Button
            component={RouterLink}
            to="/signin"
            variant="contained"
            color="primary"
            disableElevation
            sx={{ borderRadius: "20px", color: "white" }}
          >
            {t("topbar.signIn")}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
