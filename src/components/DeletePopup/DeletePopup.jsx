import { useDispatch } from "react-redux";

import { deleteTask, deleteColumn } from "../../service/api";

import css from "./DeletePopup.module.css";

const DeletePopup = ({ onClose, type, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // визначення типу об"єкту для видалення
    if (type === "task") {
      dispatch(deleteTask(id));
    } else if (type === "column") {
      dispatch(deleteColumn(id));
    }
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <p className={css.text}>Du you confirm the deletion?</p>
      <ul>
        <li className={css.list}>
          <button
            className={css.btn}
            type="button"
            onClick={onClose}
            aria-label="No, do not delete"
          >
            No
          </button>
          <button
            className={css.btn}
            type="submit"
            onClick={handleDelete}
            aria-label="Yes, delete"
          >
            Yes
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DeletePopup;
