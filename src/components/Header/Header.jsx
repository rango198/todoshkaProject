import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Icon from "../Icon/Icon";

import css from "./header.module.css";
import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
<<<<<<< Updated upstream
import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  const { theme, setTheme } = useTheme();

=======
// import { useTheme } from "../../hooks/useTheme";

const Header = () => {
  // const { theme, setTheme } = useTheme;
>>>>>>> Stashed changes
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setModalContent({
        action: "userbar",
      })
    );
    dispatch(setModalStatus(true));
  };

  const [isOpen, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  return (
    <header className={css.header}>
      <button
        type="button"
        className={css.menu_button}
        onClick={() => setOpen(!isOpen)}
      >
        <Icon id="menu" className={css.menu_icon} />
      </button>
      {isOpen && <Navigation close={close} />}
      <div className={css.box}>
        <button type="button" className={css.theme_button}>
          Theme <Icon id="chevron-down" className={css.chevron_down} />
        </button>
        <button className={css.button_user} type="button" onClick={handleClick}>
          UserName <Icon id="icon-user" className={css.icon_user} />
        </button>
      </div>
    </header>
  );
};

export default Header;
