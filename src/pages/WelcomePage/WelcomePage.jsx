import { Container, StyledImage, Title } from '../HomePage/HomePage.styled';
import example from '../../assets/example.png';
const WelcomePage = () => {
  return (
    <>
      <div>
        <h1>Welcome Page</h1>
      </div>
      <Container>
        <Title>Welcome Page</Title>
        <StyledImage src={example} alt="Example" />
      </Container>
    </>
  );
};

export default WelcomePage;
