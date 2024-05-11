import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

// import { setModalStatus } from "../../redux/slice/columnsSlice";
import { editColumnAsync } from "../../redux/thunk/columnsThunk";
import { selectedColumn } from "../../redux/selectors/serviceSelector";
import css from "./EditColumn.module.css";

const EditColumn = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useDispatch();


  const editColumn = useSelector(selectedColumn);
  

  useEffect(() => {
    setValue("title", editColumn.title);
  }, [editColumn.title, setValue]);

  useEffect(() => {
    dispatch(editColumnAsync());
  }, [dispatch]);

  
  const handleTitleChange = (evt) => {
    setValue("title", evt.target.value.toString());
  };

  const handleEditColumn = (data) => {
    const { title } = data;

    let newColumn = {};
    if (title === editColumn.title) {
      newColumn = {
        title: data.title,
      };
    } else {
      newColumn = { title };
    }

    dispatch(editColumnAsync([editColumn._id, newColumn]));
    onClose();
  };

  // const handleEditColumn = (data) => {
  //   const { title } = data;
  //   if (column) {
  //     const newColumn = { ...column, title };
  //     dispatch(editColumnAsync([column._id, newColumn]));
  //   }
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
