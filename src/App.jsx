import { Route, Routes } from "react-router-dom";

import { lazy } from "react";
import Modal from "./components/Modal/Modal";
import { setModalContent, setModalStatus } from "./redux/slice/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenModal } from "./redux/selectors/serviceSelector";
import ModalContent from "./components/ModalContent/ModalContent";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SharedLayout = lazy(
  () => import("./components/SharedLayout/SharedLayout")
);
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const LoginPage = lazy(() => import("./pages/AuthPage/AuthFormPage/LoginPage"));
const RegisterPage = lazy(
  () => import("./pages/AuthPage/AuthFormPage/RegisterPage")
);
const ScreensPage = lazy(() => import("./pages/ScreensPage/ScreensPage"));

const App = () => {
  const modalStatus = useSelector(selectOpenModal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />

          <Route path="/auth/:id" element={<AuthPage />}>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
          <Route path="/home" element={<HomePage />}>
            <Route path=":boardName" element={<ScreensPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      <Modal open={modalStatus} onClose={handleCloseModal}>
        {<ModalContent />}
      </Modal>
    </>
  );
};
export default App;
