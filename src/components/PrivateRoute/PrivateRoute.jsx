import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import Loader from "../Loader/Loader";
import {
  selectIsLoggedIn,
  selectAuthToken,
} from "../../redux/selectors/selector";

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);

  if (!isLogin && token) {
    return <Loader />;
  }

  if (!isLogin && !token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
