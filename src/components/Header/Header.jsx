import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import {
  HeaderContainer,
  // IconWrapper,
  Navigation,
  StyledLink,
} from "./Header.styled";

export const Header = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setModalContent({
        action: "add",
      })
    );
    dispatch(setModalStatus(true));
  };
  return (
    <HeaderContainer>
      <Navigation>
        <StyledLink to="/home" onClick={handleClick}>
          Home
        </StyledLink>
      </Navigation>
    </HeaderContainer>
  );
};
