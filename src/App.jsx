import { Route, Routes } from "react-router-dom";

import { lazy } from "react";

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />

        <Route path="/auth/:id" element={<AuthPage />}>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
export default App;
