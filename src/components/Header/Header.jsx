import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Icon from "../Icon/Icon";
// import {
//   HeaderContainer,
//   // IconWrapper,
//   Navigation,
//   StyledLink,
// } from "./Header.styled";

import css from "./header.module.css";
import { useState } from "react";
import { Navigation } from "./Navigation";

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
      >
        <Icon id="menu" className={css.menu_icon} />
      </button>
      {isOpen && <Navigation close={close} />}
      <div className={css.box}>
        <button type="button" className={css.theme_button}>
          Theme <Icon id="chevron-down" className={css.chevron_down} />
        </button>
        <button type="button" onClick={handleClick}>
          UserBar
        </button>
      </div>
    </header>
    // <HeaderContainer>
    //   <Navigation>
    //     <StyledLink to="/home" onClick={handleClick}>
    //       Home
    //     </StyledLink>
    //   </Navigation>
    // </HeaderContainer>
  );
};

export default Header;
