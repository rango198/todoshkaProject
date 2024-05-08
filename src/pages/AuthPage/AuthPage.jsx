import AuthComponent from "../../components/AuthForm/AuthComponent/AuthComponent";

import css from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={css.authContainer}>
      <AuthComponent />
    </div>
  );
};
export default AuthPage;
