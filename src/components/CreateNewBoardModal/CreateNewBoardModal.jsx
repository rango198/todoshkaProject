import React, { useState } from "react";

import { useForm } from "react-hook-form";

import sprite from "../../assets/svg/sprite.svg";
import data from "../../assets/img/small/data.js";

import ButtonAdd from "../ButtonAdd/ButtonAdd.jsx";
import css from "./CreateNewBoard.module.css";
import ButtonClose from "../ButtonClose/ButtonClose";

const CreateNewBoardModal = ({ onClose }) => {
  const {
    register,
    setValue,
    // formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [selectedIcon, setSelectedIcon] = useState("icon-project");
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("0");

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
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon",
    ];

    return icons.map((icon) => (
      <svg
        key={icon}
        selected={selectedIcon === icon}
        onClick={() => handleIconSelect(icon)}
        className={css.iconStyle}
      >
        <use href={`${sprite}#${icon}`} />
      </svg>
    ));
  };

  const renderBackgrounds = () => {
    return data.map((item) => (
      <div
        className={css.backgroundItem}
        key={item.id}
        selected={selectedBackgroundId === item.id}
        onClick={() => handleBackgroundSelect(item.id)}
      >
        <img
          className={css.backgroundImage}
          src={item.image}
          alt="Background"
        />
      </div>
    ));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={css.modal}>
      <h2 className={css.newBoardTitle}>New Board</h2>

      <form>
        <input
          id="newBoardInput"
          type="text"
          placeholder="Title"
          {...register("title")}
          className={css.input}
        />

        <h3 className={css.iconTitle}>Icons</h3>
        <div className={css.iconWrap}>{renderIcons()}</div>

        <h3 className={css.backgroundTitle}>Background</h3>
        <div className={css.bgIcon}>{renderBackgrounds()}</div>

        <ButtonAdd type="submit" title="Create" className={css.button} />
      </form>
      <ButtonClose onClick={handleClose} />
    </div>
  );
};
export default CreateNewBoardModal;
