import { useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import css from "./HomePage.module.css";

import ScreensPage from "../ScreensPage/ScreensPage";
import { useDispatch } from "react-redux";
import { getBoardThunk } from "../../redux/thunk/servicesThunk";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoardThunk());
  }, []);
  return (
    <div className={css.main}>
      <div className={css.sidebar}>
        <Sidebar />
      </div>
      <div className={css.screenPage}>
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
