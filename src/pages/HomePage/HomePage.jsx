import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import css from "./HomePage.module.css";
import { useTheme } from "../../hooks/useTheme";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <div className={css.sidebar}>
          <Sidebar />
        </div>
        <div className={css.main}>
          <Header />
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;