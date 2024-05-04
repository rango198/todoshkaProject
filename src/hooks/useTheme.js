import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return { theme, setTheme };
};
