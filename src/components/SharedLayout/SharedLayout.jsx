import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// import { Header } from "../Header/Header";

import Loader from "../Loader/Loader";

const SharedLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
