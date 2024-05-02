import AuthComponent from "../../components/AuthForm/AuthComponent/AuthComponent";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={styles.authContainer}>
      <AuthComponent />
    </div>
  );
};
export default AuthPage;
