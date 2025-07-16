import { createTheme } from "@mui/material/styles";

const lightPalette = {
  primary: {
    main: "#0ABAB5",
  },
  secondary: {
    main: "#f50057",
  },
  background: {
    default: "#F4F7F6",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#212121",
    secondary: "#5f6368",
  },
};

const darkPalette = {
  primary: {
    main: "#0ABAB5",
  },
  secondary: {
    main: "#f50057",
  },
  background: {
    default: "#121212",
    paper: "#1E1E1E",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#bdc1c6",
  },
};

export const getTheme = (mode) =>
  createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    typography: {
      fontFamily: 'Rubik,Roboto, "Helvetica Neue", Arial, sans-serif',
      h5: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Filled variant styles (gray bg, border-radius, hover, focus)
            '& .MuiFilledInput-root': {
              backgroundColor: mode === "dark" ? "#2d2d2d" : "#f0f0f0", // gray for dark, light gray for light mode
              borderRadius: 8,
              '&:hover': {
                backgroundColor: mode === "dark" ? "#3a3a3a" : "#e0e0e0",
              },
              '&.Mui-focused': {
                backgroundColor: mode === "dark" ? "#3a3a3a" : "#e0e0e0",
              },
              '&:before, &:after': {
                display: "none",
              },
            },
            '& .MuiInputLabel-root': {
              color: mode === "dark" ? "#8a8a8a" : "#666666",
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: "#0ABAB5", // primary.main for focus label in both modes
            },
          },
        },
      },
    },
  });
