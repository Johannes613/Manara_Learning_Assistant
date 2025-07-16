import React, { useContext } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import {
  Home,
  School,
  AutoStories,
  Star,
  Article,
  WhatsApp,
  AddCircle,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import GavelIcon from "@mui/icons-material/Gavel";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { useAuth } from "../../contexts/AuthContext";

// SVG Logo Component for Manara
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

const Sidebar = ({ drawerWidth, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeModeContext);
  const location = useLocation();

  const { subscription, isAdmin } = useAuth();
  const isPro = subscription?.plan === "pro";

  const menuItems = [
    { text: t("sidebar.home"), icon: <Home />, path: "/home" },
    { text: t("sidebar.problems"), icon: <School />, path: "/exams" },
    {
      text: t("sidebar.courses"),
      icon: <AutoStories />,
      path: "/courses",
      pro: true,
    },
    {
      text: t("sidebar.projects"),
      icon: <Article />,
      path: "/projects",
      pro: true,
    },
    { text: t("sidebar.rating"), icon: <Star />, path: "/rating", pro: true },
    { text: t("sidebar.settings"), icon: <SettingsIcon />, path: "/settings" },
    {
      text: t("sidebar.whatsapp"),
      icon: <WhatsApp />,
      path: "https://chat.whatsapp.com/FZoYftKNxBJ0B056T58nJW",
      external: true,
    },
  ];

  const adminItems = [
    { text: t("sidebar.addExam"), icon: <AddCircle />, path: "/add-exam" },
    {
      text: t("sidebar.addProject"),
      icon: <AddCircle />,
      path: "/add-project",
    },
    { text: t("sidebar.addPost"), icon: <AddCircle />, path: "/add-post" },
    { text: t("sidebar.addCourse"), icon: <AddCircle />, path: "/add-course" },
  ];

  const drawerContent = (
    <Box
      sx={
        mode === "dark"
          ? { p: 2, height: "100%", backgroundColor: "#1D2020" }
          : { p: 2, height: "100%", backgroundColor: "#E4EDED" }
      }
    >
      {/* --- BRANDING UPDATE --- */}
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          ml: 1,
          textDecoration: "none", // Remove link underline
        }}
      >
        <ManaraLogo color={mode === "dark" ? "#0ABAB5" : "#0ABAB5"} />
        <Typography
          variant="h5"
          sx={{ ml: 1.5, color: "primary.main", fontWeight: "bold" }}
        >
          Manara
        </Typography>
      </Box>
      {/* --- END OF UPDATE --- */}

      <List>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname === "/" && item.path === "/home");

          if (item.pro && !isPro && !isAdmin) {
            return null;
          }

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={item.external ? "a" : Link}
                to={!item.external ? item.path : undefined}
                href={item.external ? item.path : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selected",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {isAdmin && (
        <>
          <Divider sx={{ my: 1 }} />
          <List>
            {adminItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon sx={{ color: "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/legal" sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ color: "text.secondary" }}>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("sidebar.legal")}
              primaryTypographyProps={{ color: "text.secondary" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
