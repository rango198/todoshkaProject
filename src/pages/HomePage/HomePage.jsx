import example from "../../assets/example.png";
import { Container, StyledImage, Title } from "./HomePage.styled";

const HomePage = () => {
  return (
    <Container>
      <Title>Home Page</Title>
      <StyledImage src={example} alt="Example" />
    </Container>
  );
};

export default HomePage;
