import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { selectModalContent } from "../../redux/selectors/serviceSelector";
import { editColumnAsync } from "../../redux/thunk/columnsThunk";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import css from "./EditColumn.module.css";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

const EditColumn = () => {
  const dispatch = useDispatch();

  const editTitle = useSelector(selectModalContent);
  const title = editTitle.recordDataEdit.title;
  const id = editTitle.AddId.id;

  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: inputRef.current.value,
    };

    dispatch(editColumnAsync([id, { title: data.title }]));
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
    dispatch(setModalStatus(false));
  };

  const onClose = () => {
    dispatch(setModalContent({ action: null, recordDataEdit: null }));
    dispatch(setModalStatus(false));
  };

  return (
    <div className={css.wrapper}>
      <ButtonClose onClick={onClose} arial-label="Close" />
      <h2 className={css.title}>Edit column</h2>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={title}
          ref={inputRef}
          className={css.input}
          name="title"
          type="text"
        />
        <ButtonAdd className={css.buttonSbt} type="submit" arial-label="Edit" />
      </form>
    </div>
  );
};

export default EditColumn;
