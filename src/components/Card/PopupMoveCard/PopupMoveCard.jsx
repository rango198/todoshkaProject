import Icon from "../../Icon/Icon";
import css from "./PopupMoveCard.module.css";
import { useEffect } from "react";

// const PopupMoveCard = ({ onClose, boards, onAttachTask }) => {
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

//   const buttons = boards.map((board, index) => (
//     <button
//       key={index}
//       onClick={() => onAttachTask(board)}
//       className={css.popupButton}
//     >
//       <p className={css.text}>{board}</p>
//       <svg className={css.popupIcon}>
//         <Icon id="broken-right" />
//       </svg>
//     </button>
//   ));

//   return <div className={css.popup}>{buttons}</div>;
// };

// export default PopupMoveCard;

// Базовий код, щоб подивитись вигляд поп-ап вікна з данними

const PopupMoveCard = ({ onClose }) => {
  return (
    <div className={css.popup}>
      <button onClick={onClose} className={css.popupButton}>
        <p className={css.text}>In progress</p>
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
      <button onClick={onClose} className={css.popupButton}>
        <p>Done</p>
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
    </div>
  );
};

export default PopupMoveCard;
