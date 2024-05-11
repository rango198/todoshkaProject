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

const selectColumns = (state) => state.service.columns;
const useColumns = () => useSelector(selectColumns);

const AddCardSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    labelColor: yup.string().required(""),
  })
  .required();

const AddCard = ({ columnId, onClose }) => {
  const dispatch = useDispatch();
  const [deadlineDate, setDeadlineDate] = useState(new Date()); // Стейт для даты дедлайна
  //   const [radioChoose, setRadioChoose] = useState("without priority"); // Стейт для выбранного приоритета

  const columns = useColumns() || []; // Добавили проверку на существование columns

  // Получение количества задач в выбранной колонке
  const tasksLength =
    columns.find((column) => column._id === columnId)?.tasks.length || 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      priority: "",
      labelColor: "",
    },
    resolver: yupResolver(AddCardSchema), // Использование схемы валидации
  });

  // Функция для обработки отправки формы
  const onSubmit = (data) => {
    console.log(data); // Проверка данных формы перед отправкой
    const { title, description, labelColor, deadlineDate } = data;
    console.log(title, description, labelColor, deadlineDate);
    const newTask = {
      title,
      description,
      priority: labelColor,
      deadline: deadlineDate, // Добавление даты дедлайна в новую задачу
      column: columnId,
      index: tasksLength + 1, // Индекс новой задачи
    };

    console.log(newTask); // Проверка формирования объекта newTask

    // Диспатч экшена для добавления задачи
    dispatch(addTaskAsync(newTask));
    reset();
    onClose();
  };

  // Функция для обновления выбранной радиокнопки
  //   const handleRadioChange = (selectedPriority) => {
  //     setRadioChoose(selectedPriority);
  //   };

  // Функция для обновления выбранной даты дедлайна
  const handleDateChange = (date) => {
    setDeadlineDate(date);
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
          <RadioColorCard />
          {/* onFilterChange={handleRadioChange} */}
          {/* priority={radioChoose} */}
        </div>

        <Calendar
          selected={deadlineDate}
          onChange={handleDateChange}
          dateFormat="MMMM d"
        />
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
