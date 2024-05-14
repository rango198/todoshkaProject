import { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";

import { addTaskAsync } from "../../redux/thunk/tasksThunk";

import css from "./AddCard.module.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import RadioColorCard from "../RadioButtons/RadioColorCard";
import Calendar from "../Calendar/Calendar";
import * as yup from "yup";
import { selectModalContent } from "../../redux/selectors/serviceSelector";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

const AddCardSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    priority: yup.string(),
  })
  .required();

const AddCard = () => {
  const { AddId } = useSelector(selectModalContent);
  const columnId = AddId._id;
  const dispatch = useDispatch();
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState("Without"); // Стейт для даты дедлайна

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
      column: columnId,
      deadline,
    };

    dispatch(addTaskAsync(newTask));
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
    <div className={css.modal}>
      <h2 className={css.title}>Add card</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            className={css.input}
            placeholder="Title"
            type="text"
            {...register("title")}
          />
          <span className={css.errorMessage}>{errors.title?.message}</span>
        </label>
        <label>
          <textarea
            className={css.textAreaComment}
            placeholder="Description"
            {...register("description")}
          />
          <span className={css.errorMessage}>
            {errors.description?.message}
          </span>
        </label>
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
          className={css.buttonAdd}
          aria-label="Add"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default AddCard;
