import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { selectedColumn } from "../../redux/selectors/serviceSelector";
import { editColumnAsync } from "../../redux/thunk/columnsThunk";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import css from "./EditColumn.module.css";

const EditColumn = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const editColumn = useSelector(selectedColumn)

useEffect(() => {
  setValue('title', editColumn.title)

}, [editColumn.title, setValue])

const handleTitleChange = (evt) => {
  setValue("title", evt.target.value.toString());
};

const handleEditColumn = (data) => {
  const { title } = data;

  dispatch(editColumnAsync([editColumn._id, { title }]));
  onClose(); 
};


  return (
    <div className={css.wrapper}>
      <ButtonClose onClick={onClose} />
      <h2 className={css.title}>Edit column</h2>
      <form onSubmit={handleSubmit(handleEditColumn)}>
        <input
          className={css.input}
          id="newColumn"
          name="title"
          type="text"
          placeholder="Title"
          {...register("title")}
          onChange={handleTitleChange}
        />
        <ButtonAdd className={css.buttonSbt} type="submit" title="Add" />
      </form>
    </div>
  );
};

export default EditColumn;
