<<<<<<< Updated upstream
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
=======
import { useState, useLayoutEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  useLayoutEffect(() => {
>>>>>>> Stashed changes
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return { theme, setTheme };
};
