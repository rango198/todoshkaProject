import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import Loader from "../Loader/Loader";
import {
  selectIsLoggedIn,
  selectAuthToken,
} from "../../redux/selectors/selector";

const PublicRoute = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  const token = false;
  // const token = useSelector(selectAuthToken);

  console.log(isLogin);
  console.log(token);

  if (!isLogin && token) {
    return <Loader />;
  }

  if (isLogin) {
    return <Navigate to="/home/1" />;
  }

  return <Outlet />;
};

export default PublicRoute;
