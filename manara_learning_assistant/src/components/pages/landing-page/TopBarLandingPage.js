import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Select, // Import Select
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Language, // Import Language Icon
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { useAuth } from "../../../contexts/AuthContext";
import { ThemeModeContext } from "../../../contexts/ThemeModeContext";

// ManaraLogo SVG component
const ManaraLogo = ({ color }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.44L19.5 8.5V15.5L12 19.56L4.5 15.5V8.5L12 4.44Z"
      fill={color}
    />
    <path
      d="M12 12.5L4.5 8.5L12 4.44L19.5 8.5L12 12.5Z"
      fill={color}
      opacity="0.6"
    />
    <path d="M5 9L12 13L19 9V15L12 19V13L5 9Z" fill={color} />
  </svg>
);

const TobBarLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useAuth();
  const { mode, toggleThemeMode } = useContext(ThemeModeContext);
  const theme = useTheme();
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Language change handler
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const navItems = [
    { labelKey: "topbarLanding.features", to: "features" },
    { labelKey: "topbarLanding.about", to: "about" },
    { labelKey: "topbarLanding.pricing", to: "pricing" },
    { labelKey: "topbarLanding.contact", to: "contact" },
  ];

  const buttonBgColor = theme.palette.primary.main;
  const backgroundColor = isScrolled
    ? theme.palette.background.paper
    : "transparent";
  const navTextColor = isScrolled ? theme.palette.text.primary : "#fff";

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 2 : 0}
      sx={{
        bgcolor: backgroundColor,
        color: navTextColor,
        boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
        borderBottom: isScrolled
          ? `1px solid ${theme.palette.divider}`
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
        }}
      >
        {/* Logo */}
        <ScrollLink
          to="hero"
          smooth
          duration={500}
          offset={-70}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ManaraLogo color={buttonBgColor} />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: buttonBgColor, ml: 1 }}
          >
            Manara
          </Typography>
        </ScrollLink>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          {navItems.map((item) => (
            <ScrollLink
              key={item.labelKey}
              to={item.to}
              smooth
              duration={500}
              offset={-70}
              spy
              style={{ cursor: "pointer" }}
            >
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  color: navTextColor,
                }}
              >
                {t(item.labelKey)}
              </Button>
            </ScrollLink>
          ))}
           <IconButton
            sx={{ mx: 1, color: navTextColor }}
            onClick={() => toggleThemeMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Language Selector */}
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            variant="standard"
            disableUnderline
            IconComponent={() => <Language sx={{ color: navTextColor, ml: -1 }} />}
            sx={{
              mx: 1,
              color: navTextColor,
              "& .MuiSelect-select": {
                paddingRight: "24px",
              },
              "& .MuiSvgIcon-root": {
                 color: navTextColor,
              }
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
          </Select>


          {/* Theme Toggle */}
         

          {/* Sign In / Dashboard Button */}
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={currentUser ? "/home" : "/signin"}
            sx={{ borderRadius: "25px", px: 3 }}
          >
            {currentUser ? t("topbarLanding.dashboard") : t("topbarLanding.signIn")}
          </Button>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: 'center' }}>
           {/* Mobile Language Selector */}
           <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            variant="standard"
            disableUnderline
            IconComponent={() => <Language sx={{ color: navTextColor, ml: -1 }} />}
            sx={{
              mr: 1,
              color: navTextColor,
              "& .MuiSelect-select": {
                paddingRight: "24px",
              },
              "& .MuiSvgIcon-root": {
                 color: navTextColor,
              }
            }}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
          </Select>

          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ color: navTextColor }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {navItems.map((item) => (
              <MenuItem key={item.labelKey} onClick={handleMenuClose}>
                <ScrollLink
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-70}
                  spy
                  style={{ cursor: "pointer", width: '100%' }}
                >
                  {t(item.labelKey)}
                </ScrollLink>
              </MenuItem>
            ))}
            <MenuItem
              component={RouterLink}
              to={currentUser ? "/home" : "/signin"}
              onClick={handleMenuClose}
            >
              {currentUser ? t("topbarLanding.dashboard") : t("topbarLanding.signIn")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleThemeMode(mode === "dark" ? "light" : "dark");
                handleMenuClose();
              }}
            >
              {mode === "dark" ? t("topbarLanding.lightMode") : t("topbarLanding.darkMode")}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TobBarLandingPage;