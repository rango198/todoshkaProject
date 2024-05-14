import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Modal from "./components/Modal/Modal";
import { setModalContent, setModalStatus } from "./redux/slice/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenModal } from "./redux/selectors/serviceSelector";
import ModalContent from "./components/ModalContent/ModalContent";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
import { currentUserThunk } from "./redux/thunk/authThunk";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const ScreensPage = lazy(() => import("./pages/ScreensPage/ScreensPage"));

const App = () => {
  const modalStatus = useSelector(selectOpenModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalStatus(false));
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />

          <Route element={<PublicRoute />}>
            <Route path="auth/:id" element={<AuthPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />}>
              <Route path=":boardName" element={<ScreensPage />} />
            </Route>
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
