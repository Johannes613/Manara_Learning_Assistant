import React, { createContext, useState, useEffect, useMemo } from "react";

export const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
  mode: "light",
});

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const themeMode = useMemo(() => ({
    toggleThemeMode: () => {
      setMode((prev) => {
        const newMode = prev === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", newMode);
        return newMode;
      });
    },
    mode,
  }), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      {children}
    </ThemeModeContext.Provider>
  );
};
