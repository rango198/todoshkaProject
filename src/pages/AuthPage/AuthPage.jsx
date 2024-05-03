import { Suspense } from "react";
import AuthComponent from "../../components/AuthForm/AuthComponent/AuthComponent";
// import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import styles from "./AuthPage.module.css";
import { Outlet } from "react-router";

const AuthPage = () => {
  return (
    <div className={styles.authContainer}>
      <AuthComponent />
      {/* <EditProfileForm /> */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default AuthPage;
