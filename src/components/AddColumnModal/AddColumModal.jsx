// import React, { useState } from "react";

import css from "./AddColumModal.module.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

const AddColumnModal = ({ onClose }) => {
  return (
    <div className={css.modal}>
      <ButtonClose onClick={onClose} />
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
