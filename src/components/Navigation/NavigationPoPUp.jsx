import { useEffect } from "react";
import { createPortal } from "react-dom";

import PopupMoveCard from "../Card/PopupMoveCard/PopupMoveCard";

const navigationRoot = document.getElementById("nav-root");

export const NavigationPoPUp = ({ coordinates, taskId, close }) => {
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [close]);

  return createPortal(
    <div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        onClick={close}
      />
      <div
        style={{
          position: "absolute",
          top: coordinates.y - 60 + window.pageYOffset,
          left: coordinates.x - 130 + window.pageXOffset,
        }}
      >
        {" "}
        <PopupMoveCard taskId={taskId} />
      </div>
    </div>,
    navigationRoot
  );
};
