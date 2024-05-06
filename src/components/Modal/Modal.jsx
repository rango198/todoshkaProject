import { useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

import { useDispatch } from "react-redux";

import {
  CloseModalButton,
  StyledBackdrop,
  StyledModalContent,
} from "./Modal.styled";
import Icon from "../Icon/Icon";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

const modalRootElement = document.querySelector("#modal");

const Modal = ({ open, onClose, children }) => {
  const element = useMemo(() => document.createElement("div"), []);
  element.setAttribute("id", "modal-content");
  const dispatch = useDispatch();

  if (open) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth; // Вычисляем ширину вертикального скролла
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Добавляем padding-right для компенсации ширины скролла
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.paddingRight = "0"; // Сбрасываем padding-right при закрытии модального окна
    document.body.style.overflowY = "auto";
  }

  const handleCloseUserModal = () => {
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
    dispatch(setModalStatus(false));
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    modalRootElement.appendChild(element);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      modalRootElement.removeChild(element);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [element, handleKeyDown, open]);

  return createPortal(
    <>
      {open && (
        <StyledBackdrop onClick={handleBackdropClick}>
          <StyledModalContent>
            <CloseModalButton onClick={handleCloseUserModal}>
              <Icon id="close" />
            </CloseModalButton>
            {children}
          </StyledModalContent>
        </StyledBackdrop>
      )}
    </>,
    element
  );
};

export default Modal;

// import React, { useEffect } from "react";
// import css from "./modal.module.css";
// import { createPortal } from "react-dom";
// import Icon from "../Icon/Icon.jsx";

// const modalRoot = document.querySelector("#modal");

// const Modal = ({ children, openModal }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === "Escape") {
//         openModal();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [openModal]);

//   const handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       openModal();
//     }
//   };

//   return createPortal(
//     <div className={css.backdrop} onClick={handleBackdropClick}>
//       <div className={css.modal}>{children}</div>
//     </div>,
//     modalRoot
//   );
// };

// export default Modal;
