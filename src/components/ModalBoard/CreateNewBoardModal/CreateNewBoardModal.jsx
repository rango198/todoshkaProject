import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import sprite from "../../../assets/svg/sprite.svg";
import data from "../../../assets/img/small/data.js";

import css from "./CreateNewBoard.module.css";

import ButtonAdd from "../../ButtonAdd/ButtonAdd.jsx";
import ButtonClose from "../../ButtonClose/ButtonClose";

import { useDispatch, useSelector } from "react-redux";
import {
  addBoardThunk,
  getBoardThunk,
} from "../../../redux/thunk/servicesThunk";
import { selectAllBoards } from "../../../redux/selectors/serviceSelector";

const TitleSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Title is required"),
}).required();

const CreateNewBoardModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TitleSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIcon, setSelectedIcon] = useState("icon-project");
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("defalt");
  const existingBoardTitles = useSelector(selectAllBoards);

  useEffect(() => {
    dispatch(getBoardThunk());
  }, [dispatch]);

  const handleTitleChange = (event) => {
    setValue("title", event.target.value.toString());
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setValue("icon", icon);
  };

  const handleBackgroundSelect = (backgroundId) => {
    setSelectedBackgroundId(backgroundId);
    setValue("background", backgroundId);
  };

  const renderIcons = () => {
    const icons = [
      "icon-project",
      "icon-star",
      "icon-loading",
      "icon-puzzle",
      "icon-container",
      "icon-lightning",
      "icon-colors",
      "icon-hexagon",
    ];

    return icons.map((icon) => (
      <svg
        key={icon}
        className={`${css.iconStyle} ${selectedIcon === icon ? css.selectedIcon : ""}`}
        onClick={() => handleIconSelect(icon)}
      >
        <use href={`${sprite}#${icon}`} />
      </svg>
    ));
  };

  const renderBackgrounds = () => {
    return data.map((item) => (
      <div
        className={`${css.backgroundItem} ${selectedBackgroundId === item.name ? css.selected : ""}`}
        key={item.id}
        selected={selectedBackgroundId === item.name}
        onClick={() => handleBackgroundSelect(item.name)}
      >
        <img
          className={css.backgroundImage}
          src={item.image}
          alt="Background"
        />
      </div>
    ));
  };
  const handleCreateBoard = (data) => {
    const { title } = data;

    const isExist = existingBoardTitles.some(
      (item) => item.title.trim() === title.trim()
    );

    if (isExist) {
      toast.error(`${data.title} already exists!`, {
        theme: "colored",
        autoClose: 2500,
      });
      return;
    }

    dispatch(addBoardThunk(data)).then((d) => {
      navigate(d.payload._id);
      setValue("title", "");
      setValue("icon", "");
      setValue("background", "");
      onClose();
    });

    toast.success(`${data.title} has been successfully added to your boards!`, {
      theme: "colored",
      autoClose: 2500,
    });
  };

  return (
    <div className={css.modal}>
      <h2 className={css.newBoardTitle}>New Board</h2>

      <form onSubmit={handleSubmit(handleCreateBoard)}>
        <input
          name="title"
          id="newBoardInput"
          type="text"
          placeholder="Title"
          {...register("title")}
          className={css.input}
          onChange={handleTitleChange}
        />
        <p>{errors.title?.message}</p>

        <h3 className={css.iconTitle}>Icons</h3>

        <div className={css.iconWrap}>{renderIcons()}</div>

        <h3 className={css.backgroundTitle}>Background</h3>
        <div className={css.bgIcon}>{renderBackgrounds()}</div>

        <ButtonAdd type="submit" title="Create" className={css.button} />
      </form>
      <ButtonClose onClick={onClose} aria-label="Close" />
    </div>
  );
};
export default CreateNewBoardModal;
