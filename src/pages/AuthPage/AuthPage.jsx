import { Suspense } from "react";
import AuthComponent from "../../components/AuthForm/AuthComponent/AuthComponent";

import css from "./AuthPage.module.css";
import { Outlet } from "react-router";

const AuthPage = () => {
  return (
    <div className={css.authContainer}>
      <AuthComponent />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default AuthPage;
