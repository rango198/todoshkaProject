import { useDispatch } from "react-redux";
// import example from "../../assets/example.png";
// import { Container, StyledImage, Title } from "./HomePage.styled";
import { useEffect } from "react";
import { getTaskThunk } from "../../redux/thunk/servicesThunk";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Board from "../../components/ScreensPage/Board/Board";
import css from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskThunk({ endPoint: "/contacts" }));
  }, [dispatch]);
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <Sidebar />
      </div>
      <div className={css.main}>
        <Header />
        <Board />
      </div>
    </div>
    // <Container>
    //   <Title>Home Page</Title>
    //   <StyledImage src={example} alt="Example" />
    // </Container>
  );
};

export default HomePage;
