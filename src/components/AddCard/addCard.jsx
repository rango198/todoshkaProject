import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../../redux/thunk/tasksThunk";
import css from "./AddCard.module.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import RadioColorCard from "../RadioButtons/RadioColorCard";
import Calendar from "../Calendar/Calendar";
import * as yup from "yup";
import {
  selectModalContent,
  selectedColumn,
} from "../../redux/selectors/serviceSelector";

const AddCardSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    labelColor: yup.string(),
  })
  .required();

const AddCard = () => {
  const columns = useSelector(selectedColumn);
  const { AddId } = useSelector(selectModalContent);
  const columnId = AddId._id;
  const dispatch = useDispatch();
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [priority, setPriority] = useState(); // Стейт для даты дедлайна
  //   const [radioChoose, setRadioChoose] = useState("without priority"); // Стейт для выбранного приоритета

  // const columns = useColumns() || []; // Добавили проверку на существование columns

  // Получение количества задач в выбранной колонке
  // const tasksLength =
  //   columns.find((column) => column._id === columnId)?.tasks.length || 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDateChange = (date) => {
    setDeadlineDate(date);
  };

  // Функция для обработки отправки формы
  const onSubmit = (data) => {
    const { title, description } = data;

    const newTask = {
      title,
      description,
      priority: priority || "Without",
      // Добавление даты дедлайна в новую задачу
      column: columnId,
    };
    // Проверка формирования объекта newTask

    // Диспатч экшена для добавления задачи
    dispatch(addTaskAsync(newTask));
  };

  // Функция для обновления выбранной даты дедлайна

  const handleClikc = (value) => {
    setPriority(value);
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
          <RadioColorCard click={handleClikc} />
        </div>
        <div className={css.deadlineDiv}>
          <p className={css.textDeadline}>Deadline</p>
          <Calendar
            selected={deadlineDate}
            onChange={handleDateChange}
            dateFormat="MMMM d"
          />
        </div>
        <ButtonAdd
          className={css.buttonAdd}
          title="Add"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default AddCard;
