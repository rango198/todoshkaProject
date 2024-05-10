import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import { editColumnAsync } from "../../redux/thunk/columnsThunk";
import { selectedColumn } from "../../redux/selectors/serviceSelector";

import css from "./EditColumn.module.css";
import { editColumn } from "../../service/api";

const EditColumn = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useDispatch();

  const column = useSelector(selectedColumn);

  useEffect(() => {
    if (column) {
      setValue("title", column.title);
    }
  }, [column, setValue]);

  // useEffect(() => {
  //   setValue("title", editColumn.title);
  // }, [ediColumn.title, setValue]);

  // useEffect(() => {
  //   dispatch(editColumnAsync());
  // }, [dispatch]);

  const handleTitleChange = (evt) => {
    setValue("title", evt.target.value.toString());
  };

  const handleEditColumn = (data) => {
    const { title } = data;
    if (column) {
      const newColumn = { ...column, title };
      dispatch(editColumnAsync([column._id, newColumn]));
    }
    onClose();
  };

  // const handleEditColumn = (data) => {
  //   const { title } = data;

  //   let newColumn = { title };

  //   dispatch(editColumnAsync([editColumn._id, newColumn]));
  //   onClose();
  // };

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