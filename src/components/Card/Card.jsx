import moment from "moment/moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedColumn } from "../../redux/selectors/serviceSelector";
import DeletePopup from "../DeletePopup/DeletePopup";
import PopupMoveCard from "./PopupMoveCard/PopupMoveCard";
import Icon from "../Icon/Icon";
import css from "./Card.module.css";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import { NavigationPoPUp } from "../Navigation/NavigationPoPUp";

const Card = ({ task, columnId }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectedColumn);
  const { _id, title, description, priority, deadline } = task;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showFullText, setShowFullText] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showPopupMove, setShowPopupMove] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const editCard = () => {
    dispatch(
      setModalContent({
        action: "editCard",
        recordDataEdit: {
          _id,
          editTitle: title,
          editDescription: description,
          editPriority: priority,
          editDedline: deadline,
        },
      })
    );
    dispatch(setModalStatus(true));
  };

  const handleClickPopupMove = (e) => {
    setClickCoordinates({ x: e.clientX, y: e.clientY });
    setShowPopupMove(!showPopupMove);
  };

  const handleClickPopupClose = () => {
    setShowPopupMove(!showPopupMove);
  };

  const handleClickDelete = () => {
    setShowPopupDelete(true);
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

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };

  let priorityColor;

  switch (task.priority) {
    case "Without priority":
      priorityColor = "var(--datepicker-grey)";
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
      priorityColor = "var(--datepicker-grey)";
      break;
  }

  const circleStyle = {
    backgroundColor: priorityColor,
  };

  const wrapperCardStyle = {
    borderLeft: `4px solid ${priorityColor}`,
  };

  // Функція, яка перевіряє, чи потрібно додати три точки
  const shouldDisplayEllipsis = (text) => {
    const lines = text.split("\n");
    return lines.length > 1;
  };

  return (
    <div className={css.wrapperCard} style={wrapperCardStyle}>
      <h4 className={css.title}>{title}</h4>
      <p
        className={`${css.description} ${shouldDisplayEllipsis(description) ? css.ellipsis : ""} ${showFullText ? css.fullText : ""}`}
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
            <button
              onClick={handleClickPopupMove}
              className={css.button}
              aria-label="Move Popup"
            >
              <svg className={css.icon}>
                <Icon id="broken-right" />
              </svg>
            </button>
          )}
          {showPopupMove && (
            <NavigationPoPUp
              close={handleClickPopupClose}
              taskId={_id}
              coordinates={clickCoordinates}
            />
          )}
          <button
            onClick={editCard}
            className={css.button}
            aria-label="Edit card"
          >
            <svg className={css.icon}>
              <Icon id="pencil" />
            </svg>
          </button>

          <button
            onClick={handleClickDelete}
            className={css.button}
            aria-label="Delete"
          >
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
