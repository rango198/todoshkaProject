import moment from "moment/moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectedColumn } from "../../redux/selectors/serviceSelector";
import DeletePopup from "../DeletePopup/DeletePopup";
import PopupMoveCard from "./PopupMoveCard/PopupMoveCard";
import Icon from "../Icon/Icon";
import css from "./Card.module.css";

const Card = ({ task }) => {
  const columns = useSelector(selectedColumn);
  const { _id, title, description, priority, deadline, column } = task;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleClickPopup = () => {
    setShowPopup(!showPopup);
    console.log("Click");
  };

  const handleClickEdit = () => {
    console.log("click");
  };

  const handleClickDelete = () => {
    setShowPopupDelete(true);
    console.log("click");
  };

  const handleCloseDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  const handleFullText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    // Оновлення поточної дати кожну хвилину
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // const formatDate = (dateString) => {
  //   // перетворюємо дату на дд/мм/рр
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}`;
  // };

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  let priorityColor;

  switch (task.priority) {
    case "Without priority":
      priorityColor = "rgba(255, 255, 255, 0.3)";
      break;
    case "Low":
      priorityColor = "#8fa1d0";
      break;
    case "Medium":
      priorityColor = "#e09cb5";
      break;
    case "High":
      priorityColor = "#bedbb0";
      break;
    default:
      // Якщо пріоритет не знайдено, встановимо колір за замовчуванням
      priorityColor = "rgba(255, 255, 255, 0.3)";
      break;
  }

  const circleStyle = {
    backgroundColor: priorityColor,
  };

  const wrapperCardStyle = {
    borderLeft: `4px solid ${priorityColor}`,
  };

  return (
    <div className={css.wrapperCard} style={wrapperCardStyle}>
      <h4 className={css.title}>{title}</h4>
      <p
        className={`${css.description} ${showFullText ? css.fullText : ""}`}
        onClick={handleFullText}
      >
        {description}
      </p>
      <hr className={css.line} />
      <div className={css.propertiesGroup}>
        <div className={css.leftGroup}>
          <div className={css.titleGroup}>
            <p className={css.text}>Priority</p>
            <div className={css.priorityGroup}>
              <hr className={css.circle} style={circleStyle}></hr>
              <p className={css.priority}>{priority}</p>
            </div>
          </div>
          <div className={css.deadlineGroup}>
            <p className={css.text}>Deadline</p>
            <p className={css.priority}>{formatDate(deadline)}</p>
          </div>
        </div>
        <div className={css.iconsGroup}>
          {moment(deadline).isSame(currentDate, "day") && (
            <svg className={css.bellIkon}>
              <Icon id="bell" />
            </svg>
          )}
          {columns.length > 1 && (
            <button onClick={handleClickPopup} className={css.button}>
              <svg className={css.icon}>
                <Icon id="broken-right" />
              </svg>
            </button>
          )}
          {showPopup && <PopupMoveCard onClose={handleClickPopup} />}
          <button onClick={handleClickEdit} className={css.button}>
            <svg className={css.icon}>
              <Icon id="pencil" />
            </svg>
          </button>
          <button onClick={handleClickDelete} className={css.button}>
            <svg className={css.icon}>
              <Icon id="trash" />
            </svg>
          </button>
          {showPopupDelete && (
            <DeletePopup onClose={handleCloseDelete} id={_id} type="task" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

// Базовий код, щоб подивитись вигляд поп-ап вікна з данними

// import { useState } from "react";
// import DeletePopup from "../DeletePopup/DeletePopup";
// import PopupMoveCard from "./PopupMoveCard/PopupMoveCard";
// import Icon from "../Icon/Icon";
// import css from "./Card.module.css";
// import { useDispatch } from "react-redux";
// import {
//   setModalContent,
//   setModalStatus,
// } from "../../redux/slice/servicesSlice";

// const Card = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showFullText, setShowFullText] = useState(false);
//   const [showPopupDelete, setShowPopupDelete] = useState(false);

//   const dispatch = useDispatch();
//   //const columns = useSelector((state) => state.columns); Отримати список колонок з Redux store

//   const handleClickPopup = () => {
//     setShowPopup(!showPopup);
//     console.log("Click");
//   };

//   const handleClickEdit = () => {
//     console.log("click");
//     dispatch(
//       setModalContent({
//         action: "editCard",
//       })
//     );
//     dispatch(setModalStatus(true));
//   };

//   const handleClickDelete = () => {
//     setShowPopupDelete(true);
//     console.log("click");
//   };

//   const handleCloseDelete = () => {
//     setShowPopupDelete(!showPopupDelete);
//   };

//   const handleFullText = () => {
//     setShowFullText(!showFullText);
//   };

//   return (
//     <div className={css.wrapperCard}>
//       <h4 className={css.title}>The Watch Spot Design</h4>
//       <p
//         className={`${css.description} ${showFullText ? css.fullText : ""}`}
//         onClick={handleFullText}
//       >
//         Create a visually stunning and eye-catching watch dial design that
//         embodies our brand's essence of sleek aesthetics and modern elegance.
//         Your design should be unique, innovative, and reflective of the latest
//         trends in watch design.
//       </p>
//       <hr className={css.line} />
//       <div className={css.propertiesGroup}>
//         <div className={css.leftGroup}>
//           <div className={css.titleGroup}>
//             <p className={css.text}>Priority</p>
//             <div className={css.priorityGroup}>
//               <hr className={css.circle}></hr>
//               <p className={css.priority}>Without</p>
//             </div>
//           </div>
//           <div className={css.deadlineGroup}>
//             <p className={css.text}>Deadline</p>
//             <p className={css.priority}>12/05/2023</p>
//           </div>
//         </div>
//         <div className={css.iconsGroup}>
//           <svg className={css.bellIkon}>
//             <Icon id="bell" />
//           </svg>
//           {/*{columns.length > 1 && /*показуємо кнопку якщо є хоча б дві колонки*/}
//           <button onClick={handleClickPopup} className={css.button}>
//             <svg className={css.icon}>
//               <Icon id="broken-right" />
//             </svg>
//           </button>
//           {/* } */}
//           {showPopup && <PopupMoveCard onClose={handleClickPopup} />}
//           <button onClick={handleClickEdit} className={css.button}>
//             <svg className={css.icon}>
//               <Icon id="pensil" />
//             </svg>
//           </button>
//           <button onClick={handleClickDelete} className={css.button}>
//             <svg className={css.icon}>
//               <Icon id="trash" />
//             </svg>
//           </button>
//           {showPopupDelete && <DeletePopup onClose={handleCloseDelete} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
