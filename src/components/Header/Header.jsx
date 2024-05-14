import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";

import Icon from "../Icon/Icon";
import UserInfo from "./UserInfo";
import Theme from "../Theme/Theme";

import css from "./Header.module.css";

const Header = () => {
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
        aria-label="navigation"
      >
        <Icon id="menu" className={css.menu_icon} />
      </button>
      {isOpen && <Navigation close={close} />}
      <div className={css.box}>
        <Theme />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
