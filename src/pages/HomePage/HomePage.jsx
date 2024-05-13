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
  }, [dispatch]);
  return (
    <div className={css.container}>
      <div className={css.main}>
        <div className={css.sidebar}>
          <Sidebar />
        </div>
        <div className={css.rrr}>
          <ScreensPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
