import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import sprite from "../../../assets/svg/sprite.svg";
import data from "../../../assets/img/small/data.js";
import ButtonAdd from "../../ButtonAdd/ButtonAdd.jsx";
import css from "./EditBoard.module.css";
import ButtonClose from "../../ButtonClose/ButtonClose";
// import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  editBoardThunk,
  getBoardThunk,
} from "../../../redux/thunk/servicesThunk";
import { selectedBoard } from "../../../redux/selectors/serviceSelector";

const EditBoardModal = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm();

  // const navigate = useNavigate();

  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("");
  const dispatch = useDispatch();
  const editBoard = useSelector(selectedBoard);

  useEffect(() => {
    setValue("title", editBoard.title);
    setValue("icon", editBoard.icon);
    setValue("background", editBoard.background);
    setSelectedIcon(editBoard.icon);
    setSelectedBackgroundId(editBoard.background);
  }, [editBoard.background, editBoard.icon, editBoard.title, setValue]);

  // useEffect(() => {
  //   dispatch(getBoardThunk());
  // }, [dispatch]);

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
        // selected={selectedIcon === icon}
        onClick={() => handleIconSelect(icon)}
        // className={css.iconStyle}
      >
        <use href={`${sprite}#${icon}`} />
      </svg>
    ));
  };

  const renderBackgrounds = () => {
    return data.map((item) => (
      <div
        className={`${css.backgroundItem} ${selectedBackgroundId === item.name ? css.selected : ""}`}
        // className={css.backgroundItem}
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
  const handleEditBoard = (data) => {
    const { title, icon, background } = data;

    let newBoard = {};
    if (title === editBoard.title) {
      newBoard = {
        icon: data.icon,
        background: data.background,
      };
    } else {
      newBoard = { title, icon, background };
    }

    dispatch(editBoardThunk([editBoard._id, newBoard]));
    onClose();
  };

  return (
    <div className={css.modal}>
      <h2 className={css.newBoardTitle}>Edit Board</h2>

      <form onSubmit={handleSubmit(handleEditBoard)}>
        <input
          name="title"
          id="newBoardInput"
          type="text"
          placeholder="Title"
          {...register("title")}
          className={css.input}
          onChange={handleTitleChange}
        />

        <h3 className={css.iconTitle}>Icons</h3>

        <div className={css.iconWrap}>{renderIcons()}</div>

        <h3 className={css.backgroundTitle}>Background</h3>
        <div className={css.bgIcon}>{renderBackgrounds()}</div>

        <ButtonAdd type="submit" title="Edit" className={css.button} />
      </form>
      <ButtonClose onClick={onClose} />
    </div>
  );
};
export default EditBoardModal;
