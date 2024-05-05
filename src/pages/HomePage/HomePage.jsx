import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTaskThunk } from "../../redux/thunk/servicesThunk";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
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
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
