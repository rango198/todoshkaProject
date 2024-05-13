import { Suspense, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import css from "./HomePage.module.css";
import { useTheme } from "../../hooks/useTheme";
import Loader from "../../components/Loader/Loader";
import ScreensPage from "../ScreensPage/ScreensPage";
import { useDispatch } from "react-redux";
import { getBoardThunk } from "../../redux/thunk/servicesThunk";
// import NewBoard from "../../components/Screens/NewBoard/NewBoard";

// import { useDispatch } from "react-redux";
// import { getBoardThunk } from "../../redux/thunk/servicesThunk";

const HomePage = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        {/* <div className={css.sidebar}>
          <Sidebar />
        </div> */}
        <div className={css.main}>
          <div className={css.sidebar}>
            <Sidebar />
          </div>
          <div className={css.rrr}>
            {/* <Header /> */}
            <ScreensPage />
          </div>
          {/* <NewBoard /> */}
          {}
          {/* <AddCard /> */}
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
