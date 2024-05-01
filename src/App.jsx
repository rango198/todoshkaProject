import { Route, Routes } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import HomePage from "./pages/HomePage/HomePage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const test = import.meta.env.VITE_API_TEST;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<WelcomePage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
