import { useSelector } from "react-redux";
import { selectedColumn } from "../../../redux/selectors/serviceSelector";
import Icon from "../../Icon/Icon";
import css from "./PopupMoveCard.module.css";
import { useEffect } from "react";

const PopupMoveCard = ({ onClose, onAttachTask }) => {
  const columns = useSelector(selectedColumn);
  console.log(columns);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (!event.currentTarget.closest(`.${css.popup}`)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const buttons = columns.map((column, index) => (
    <li key={index} className={css.item}>
      <span className={css.text}>{column.title}</span>
      <button
        onClick={() => onAttachTask(column.title)}
        className={css.popupButton}
      >
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
    </li>
  ));

  return <ul className={css.popup}>{buttons}</ul>;
};

export default PopupMoveCard;

//Базовий код, щоб подивитись вигляд поп-ап вікна з данними

// const PopupMoveCard = ({ onClose }) => {
//   return (
//     <div className={css.popup}>
//       <button onClick={onClose} className={css.popupButton}>
//         <span className={css.text}>In progress</span>
//         <svg className={css.popupIcon}>
//           <Icon id="broken-right" />
//         </svg>
//       </button>
//       <button onClick={onClose} className={css.popupButton}>
//         <span>Done</span>
//         <svg className={css.popupIcon}>
//           <Icon id="broken-right" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default PopupMoveCard;
