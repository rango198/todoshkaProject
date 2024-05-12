import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { moveTaskAsync } from "../../../redux/thunk/tasksThunk";
import { selectedColumn } from "../../../redux/selectors/serviceSelector";
import { selectAuthToken } from "../../../redux/selectors/selector";

import Icon from "../../Icon/Icon";
import css from "./PopupMoveCard.module.css";

const PopupMoveCard = ({ taskId, onClose }) => {
  const columns = useSelector(selectedColumn);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  let sourceColumnId = null;

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (popupRef.current && !event.target.closest(`.${css.popup}`)) {
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

  const accessToken = useSelector(selectAuthToken);

  const handleMoveTask = async (
    sourceColumnId,
    destinationColumnId,
    taskId
  ) => {
    try {
      await dispatch(
        moveTaskAsync({
          sourceColumnId,
          destinationColumnId,
          taskId,
          accessToken,
        })
      );
      onClose();
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const columnContainingTask = columns.find((column) =>
    column.tasks.some((task) => task._id === taskId)
  );

  if (columnContainingTask) {
    sourceColumnId = columnContainingTask._id;
  } else {
    console.error("The column containing the task was not found.");
  }

  const buttons = columns.map((column) => (
    <li key={column._id} className={css.item}>
      <span className={css.text}>{column.title}</span>
      <button
        onClick={() => {
          console.log("source:", sourceColumnId);
          console.log("destination:", column._id);
          console.log("Task ID:", taskId);
          handleMoveTask(sourceColumnId, column._id, taskId);
        }}
        className={css.popupButton}
      >
        <svg className={css.popupIcon}>
          <Icon id="broken-right" />
        </svg>
      </button>
    </li>
  ));

  return (
    <ul className={css.popup} ref={popupRef}>
      {buttons}
    </ul>
  );
};

export default PopupMoveCard;
