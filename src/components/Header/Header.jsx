import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Icon from "../Icon/Icon";
import Theme from "../Theme/Theme";

import css from "./header.module.css";
import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";

import UserInfo from "./UserInfo";

const Header = () => {
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
        aria-label="navigation"
      >
        <Icon id="menu" className={css.menu_icon} />
      </button>
      {isOpen && <Navigation close={close} />}
      <div className={css.box}>
        <Theme />
        {/* <button
          className={css.button_user}
          type="button"
          onClick={handleClick}
          aria-label="user-profile"
        >
          {" "}
          UserName
          <div className={css.avatar}></div>
        </button> */}
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
