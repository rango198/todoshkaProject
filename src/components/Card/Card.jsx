// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// import PopupMoveCard from "./PopupMoveCard/PopupMoveCard";
// import Icon from "../Icon/Icon";
// import css from "./Card.module.css";

// const Card = () => {
//   const task = useSelector((state) => state.task); // Припустила що дані про одну таску зберігаються у Redux під ключем "task"
//   //const boards = useSelector((state) => state.boards); Отримати список дошок з Redux store для відображення значка перемістити

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showPopup, setShowPopup] = useState(false);
//   const [showFullText, setShowFullText] = useState(false);

//   const handleClickPopup = () => {
//     setShowPopup(!showPopup);
//     console.log("Click");
//   };

//   const handleClickEdit = () => {
//     console.log("click");
//   };

//   const handleClickDelete = () => {
//     console.log("click");
//   };

//   const handleFullText = () => {
//     setShowFullText(!showFullText);
//   };

//   useEffect(() => {
//     // Оновлення поточної дати кожну хвилину
//     const interval = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatDate = (dateString) => {
//     // перетворюємо дату на дд/мм/рр
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   };

//   let priorityColor;

//   switch (task.priority) {
//     case "Without priority":
//       priorityColor = "rgba(255, 255, 255, 0.3)";
//       break;
//     case "Low":
//       priorityColor = "#8fa1d0";
//       break;
//     case "Medium":
//       priorityColor = "#e09cb5";
//       break;
//     case "High":
//       priorityColor = "#bedbb0";
//       break;
//     default:
//       // Якщо пріоритет не знайдено, встановимо колір за замовчуванням
//       priorityColor = "rgba(255, 255, 255, 0.3)";
//       break;
//   }

//   const circleStyle = {
//     backgroundColor: priorityColor,
//   };

//   const wrapperCardStyle = {
//     borderLeft: `4px solid ${priorityColor}`,
//   };

//   return (
//     <div className={css.wrapperCard} style={wrapperCardStyle}>
//       <h4 className={css.title}>{task.title}</h4>
//       <p
//         className={`${css.description} ${showFullText ? css.fullText : ""}`}
//         onClick={handleFullText}
//       >
//         {task.description}
//       </p>
//       <hr className={css.line} />
//       <div className={css.propertiesGroup}>
//         <div className={css.leftGroup}>
//           <div className={css.titleGroup}>
//             <p className={css.text}>Priority</p>
//             <div className={css.priorityGroup}>
//               <hr className={css.circle} style={circleStyle}></hr>
//               <p className={css.priority}>{task.priority}</p>
//             </div>
//           </div>
//           <div className={css.deadlineGroup}>
//             <p className={css.text}>Deadline</p>
//             <p className={css.priority}>{formatDate(task.deadline)}</p>
//           </div>
//         </div>
//         <div className={css.iconsGroup}>
//           {formatDate(task.deadline) === currentDate.toLocaleDateString() && (
//             <svg className={css.bellIkon}>
//               <Icon id="bell" />
//             </svg>
//           )}
//           {/*{boards.length > 1 && /*показуємо кнопку якщо є хоча б дві дошки*/}
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
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

// Базовий код, щоб подивитись вигляд поп-ап вікна з данними

import { useState } from "react";
import PopupMoveCard from "./PopupMoveCard/PopupMoveCard";
import Icon from "../Icon/Icon";
import css from "./Card.module.css";

const Card = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  //const boards = useSelector((state) => state.boards); Отримати список дошок з Redux store

  const handleClickPopup = () => {
    setShowPopup(!showPopup);
    console.log("Click");
  };

  const handleClickEdit = () => {
    console.log("click");
  };

  const handleClickDelete = () => {
    console.log("click");
  };

  const handleFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className={css.wrapperCard}>
      <h4 className={css.title}>The Watch Spot Design</h4>
      <p
        className={`${css.description} ${showFullText ? css.fullText : ""}`}
        onClick={handleFullText}
      >
        Create a visually stunning and eye-catching watch dial design that
        embodies our brand's essence of sleek aesthetics and modern elegance.
        Your design should be unique, innovative, and reflective of the latest
        trends in watch design.
      </p>
      <hr className={css.line} />
      <div className={css.propertiesGroup}>
        <div className={css.leftGroup}>
          <div className={css.titleGroup}>
            <p className={css.text}>Priority</p>
            <div className={css.priorityGroup}>
              <hr className={css.circle}></hr>
              <p className={css.priority}>Without</p>
            </div>
          </div>
          <div className={css.deadlineGroup}>
            <p className={css.text}>Deadline</p>
            <p className={css.priority}>12/05/2023</p>
          </div>
        </div>
        <div className={css.iconsGroup}>
          <svg className={css.bellIkon}>
            <Icon id="bell" />
          </svg>
          {/*{boards.length > 1 && /*показуємо кнопку якщо є хоча б дві дошки*/}
          <button onClick={handleClickPopup} className={css.button}>
            <svg className={css.icon}>
              <Icon id="broken-right" />
            </svg>
          </button>
          {/* } */}
          {showPopup && <PopupMoveCard onClose={handleClickPopup} />}
          <button onClick={handleClickEdit} className={css.button}>
            <svg className={css.icon}>
              <Icon id="pensil" />
            </svg>
          </button>
          <button onClick={handleClickDelete} className={css.button}>
            <svg className={css.icon}>
              <Icon id="trash" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
