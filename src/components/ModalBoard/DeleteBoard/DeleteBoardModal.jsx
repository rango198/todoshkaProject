import ButtonClose from "../../ButtonClose/ButtonClose";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardThunk } from "../../../redux/thunk/servicesThunk";
import Icon from "../../Icon/Icon";
import css from "./DeleteBoard.module.css";
import { selectedBoard } from "../../../redux/selectors/serviceSelector";

const DeleteBoardModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectedBoard);

  const handleDelete = (id) => {
    if (id === currentBoard._id) {
      dispatch(deleteBoardThunk(id));
    }
  };

  return (
    <div className={css.modal}>
      <form onSubmit={handleDelete}>
        <h2 className={css.newBoardTitle}>
          Are you sure that you want to delete a board?
        </h2>

        <button type="submit" className={css.button} aria-label="Delete">
          <span className={css.button_icon_bg}>
            <Icon id="trash" className={css.button_icon} />
          </span>

          <span className={css.button_title}>Delete</span>
        </button>
      </form>
      <ButtonClose onClick={onClose} aria-label="Close" />
    </div>
  );
};
export default DeleteBoardModal;
