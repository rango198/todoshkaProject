import { useDispatch } from "react-redux";
import example from "../../assets/example.png";
import { Container, StyledImage, Title } from "./HomePage.styled";
import { useEffect } from "react";
import { getTaskThunk } from "../../redux/thunk/servicesThunk";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskThunk({ endPoint: "/contacts" }));
  }, [dispatch]);
  return (

    <Container>
        <Sidebar  />
      <Title>Home Page</Title>

      <StyledImage src={example} alt="Example" />


     </Container>
  );
};

export default HomePage;
