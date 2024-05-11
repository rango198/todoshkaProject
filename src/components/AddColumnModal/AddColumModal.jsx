import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumnAsync } from "../../redux/thunk/columnsThunk";
import { selectedBoard } from "../../redux/selectors/serviceSelector";
import { useForm } from "react-hook-form";
import ButtonClose from "../ButtonClose/ButtonClose";
// import { toast } from "react-toastify";
import Icon from "../Icon/Icon.jsx";
import css from "./AddColumModal.module.css";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);
  const boardId = board?._id;

  console.log("selectedBoard:", board);
  console.log("Board ID:", boardId);

  const { register, handleSubmit } = useForm();
  // const [errorMessage, setErrorMessage] = useState(null);

  const onClose = () => {
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
    dispatch(setModalStatus(false));
  };

  const onSubmit = async (data) => {
    const { title } = data;

    dispatch(addColumnAsync({ title, boardId }));
    onClose();
  };

  return (
    <div className={css.modal}>
      <ButtonClose onClick={onClose} />
      <p className={css.title}>Add column</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: true })}
          className={css.input}
          type="text"
          placeholder="Введіть назву стовпця"
        />
        <button className={css.submBtn} type="submit">
          <span className={css.button_icon_bg}>
            <Icon id="plus" className={css.button_icon} />
          </span>
          <span className={css.button_title}>Add</span>
        </button>
      </form>
    </div>
  );
};

export default AddColumnModal;
