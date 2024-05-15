import { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import RadioColorCard from "../../RadioButtons/RadioColorCard";
import css from "./EditCardModal.module.css";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import { selectModalContent } from "../../../redux/selectors/serviceSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/slice/servicesSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editTaskAsync } from "../../../redux/thunk/tasksThunk";

const AddCardSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    priority: yup.string(),
  })
  .required();

const EditCardModal = () => {
  const dispatch = useDispatch();
  const { recordDataEdit } = useSelector(selectModalContent);
  const { _id, editTitle, editDescription } = recordDataEdit;

  const [deadline, setDeadline] = useState(recordDataEdit.editDedline);
  const [priority, setPriority] = useState("Without");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddCardSchema) });

  const onSubmit = (data) => {
    const { title, description } = data;

    const newTask = {
      title,
      description,
      priority: priority || "Without",
      deadline,
    };

    dispatch(editTaskAsync({ _id, newTask }));
    dispatch(setModalStatus(false));
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
  };
  const handleClick = (value) => {
    setPriority(value);
  };
  const handleDateChange = (date) => {
    setDeadline(date);
  };
  return (
    <>
      <div className={css.modalContainer}>
        <p className={css.textNameModal}>Edit card</p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            autoComplete="off"
            defaultValue={editTitle}
            className={css.inputEdit}
            type="text"
            {...register("title")}
            name="title"
          />
          <textarea
            autoComplete="off"
            {...register("description")}
            defaultValue={editDescription}
            className={css.textAreaDescription}
            required
            name="description"
            type="text"
          />
          <div className={css.labelDiv}>
            <p className={css.textLabel}>Label color</p>
            <RadioColorCard click={handleClick} />
          </div>
          <div className={css.deadlineDiv}>
            <p className={css.textDeadline}>Deadline</p>
            <Calendar
              selected={deadline}
              newData={handleDateChange}
              dateFormat="EEEE MMMM dd"
            />
          </div>

          <ButtonAdd
            className={css.buttonEdit}
            title="Edit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            aria-label="Edit card"
          />
        </form>
      </div>
    </>
  );
};

export default EditCardModal;
