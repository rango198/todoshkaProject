import { useEffect } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../Sidebar/Sidebar";

import css from "./navigation.module.css";

const navigationRoot = document.getElementById("navigation-root");

export const Navigation = ({ close }) => {
  const closeNav = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeNav);
    return () => {
      document.removeEventListener("keydown", closeNav);
    };
  }, []);

  return createPortal(
    <div className={css.overlay} onClick={closeNav}>
      <div className={css.box_menu}>
        <Sidebar />
      </div>
    </div>,
    navigationRoot
  );
};
