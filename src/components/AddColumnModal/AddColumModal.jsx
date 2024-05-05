// import React, { useState } from "react";
import Icon from "../Icon/Icon";
import css from "./AddColumModal.module.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

const AddColumnModal = ({ onClose }) => {
  return (
    <div className={css.modal}>
      <button className={css.close_btn} onClick={onClose}>
        <Icon id="close" className={css.close_svg} />
      </button>
      <p className={css.title}>Add column</p>
      <form className={css.form}>
        <input
          name="title"
          className={css.input}
          type="text"
          placeholder="Title"
        />
        <ButtonAdd type="submit" title="Add" className={css.submBtn} />
      </form>
    </div>
  );
};
export default AddColumnModal;
