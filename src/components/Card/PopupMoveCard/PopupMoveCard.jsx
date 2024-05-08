import Icon from "../../Icon/Icon";
import css from "./PopupMoveCard.module.css";
// import { useEffect } from "react";

// const PopupMoveCard = ({ onClose, columns, onAttachTask }) => {
//   useEffect(() => {
//     const handleEscapeKeyPress = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     const handleClickOutside = (event) => {
//       if (!event.currentTarget.closest(`.${css.popup}`)) {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEscapeKeyPress);
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("keydown", handleEscapeKeyPress);
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [onClose]);

//   const buttons = columns.map((board, index) => (
//    <li key={index}>
//     <button
//       onClick={() => onAttachTask(board)}
//       className={css.popupButton}
//      >
//       <span className={css.text}>{board}</span>
//       <svg className={css.popupIcon}>
//         <Icon id="broken-right" />
//       </svg>
//     </button>
//    </li>
//   ));

//   return <ul className={css.popup}>{buttons}</ul>;
// };

// export default PopupMoveCard;

// Базовий код, щоб подивитись вигляд поп-ап вікна з данними

const PopupMoveCard = ({ onClose }) => {
  return (
    <div className={css.popup}>
      <button onClick={onClose} className={css.popupButton}>
        <span className={css.text}>In progress</span>
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
      <button onClick={onClose} className={css.popupButton}>
        <span>Done</span>
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
    </div>
  );
};

export default PopupMoveCard;
