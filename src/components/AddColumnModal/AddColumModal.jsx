import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addColumnAsync } from "../../redux/thunk/columnsThunk";
import { setModalStatus } from "../../redux/slice/columnsSlice";
import { selectedBoard } from "../../redux/selectors/serviceSelector";

import { useForm } from "react-hook-form";
import ButtonClose from "../ButtonClose/ButtonClose";
import { toast } from "react-toastify";
import Icon from "../Icon/Icon.jsx";
import css from "./AddColumModal.module.css";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);
  const boardId = board?._id;

  console.log("selectedBoard:", board);
  console.log("Board ID:", boardId);

  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const onClose = () => {
    dispatch(setModalStatus(false));
  };

  const onSubmit = async (data) => {
    try {
      const { title } = data;

      const response = await dispatch(addColumnAsync({ title, boardId }));

      if (response.error) {
        setErrorMessage(response.payload);
      } else {
        toast.success(`Column created with title ${title}`);
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding column");
    }
  };

  return (
    <div className={css.modal}>
      <ButtonClose onClick={onClose} />
      <p className={css.title}>Add column</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          className={css.input}
          type="text"
          placeholder="Enter column title"
        />
        {errorMessage && <span className={css.error}>{errorMessage}</span>}
        <button className={css.submBtn} type="submit">
          <span className={css.button_icon_bg}>
            <Icon id="plus" className={css.button_icon} />
          </span>
          <span className={css.button_title}>Add</span>
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddColumnModal;
