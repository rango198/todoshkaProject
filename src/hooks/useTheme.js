import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeThunk } from "../redux/thunk/authThunk";
import { selectUserTheme } from "../redux/selectors/selector.js";

export const useTheme = () => {
  const dispatch = useDispatch();

  const userTheme = useSelector(selectUserTheme);

  const [theme, setTheme] = useState(userTheme || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    dispatch(changeThemeThunk({ theme }));
  }, [theme]);

  return { theme, setTheme };
};
