import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addColumnAsync } from "../../redux/thunk/columnsThunk";
import { selectedBoard } from "../../redux/selectors/serviceSelector";

import css from "./AddColumModal.module.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);
  const boardId = board?._id;
  const { register, handleSubmit } = useForm();

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
      <ButtonClose onClick={onClose} aria-label="Close" />
      <h2 className={css.title}>Add column</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          {...register("title", { required: true })}
          className={css.input}
          type="text"
          placeholder="Title"
        />
        <ButtonAdd className={css.buttonSbt} type="submit" title="Add" />
      </form>
    </div>
  );
};

export default AddColumnModal;
