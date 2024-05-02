import {
  HeaderContainer,
  // IconWrapper,
  Navigation,
  StyledLink,
} from "./Header.styled";

export const Header = () => {
  return (
    <HeaderContainer>
      <Navigation>
        <StyledLink to="/home">Home</StyledLink>
      </Navigation>
    </HeaderContainer>
  );
};
