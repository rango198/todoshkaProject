import AuthComponent from "../../components/AuthForm/AuthComponent/AuthComponent";
// import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={styles.authContainer}>
      <AuthComponent />
      {/* <EditProfileForm /> */}
    </div>
  );
};
export default AuthPage;
