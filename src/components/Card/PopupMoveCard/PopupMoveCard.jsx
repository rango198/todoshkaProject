import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { moveTaskAsync } from "../../../redux/thunk/tasksThunk";
import { selectedColumn } from "../../../redux/selectors/serviceSelector";
import { selectAuthToken } from "../../../redux/selectors/selector";

import { fetchSingleBoard } from "../../../redux/thunk/servicesThunk";
import { selectedBoard } from "../../../redux/selectors/serviceSelector";

import Icon from "../../Icon/Icon";
import css from "./PopupMoveCard.module.css";

const PopupMoveCard = ({ taskId, onClose }) => {
  const columns = useSelector(selectedColumn);
  const selectedBoardData = useSelector(selectedBoard);
  const selectedBoardId = selectedBoardData ? selectedBoardData._id : null;
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  let sourceColumnId = null;

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
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

      await dispatch(fetchSingleBoard(selectedBoardId));

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

  const buttons = columns
    .filter((column) => column._id !== sourceColumnId)
    .map((column) => (
      <div
        key={column._id}
        className={css.item}
        onClick={() => {
          handleMoveTask(sourceColumnId, column._id, taskId);
        }}
      >
        <span className={css.text}>{column.title}</span>
        <button className={css.popupButton}>
          <svg className={css.popupIcon}>
            <Icon id="broken-right" />
          </svg>
        </button>
      </div>
    ));

  return (
    <div className={css.popup} ref={popupRef}>
      {buttons}
    </div>
  );
};

export default PopupMoveCard;
