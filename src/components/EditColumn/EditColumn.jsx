import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { selectedColumn } from "../../redux/selectors/serviceSelector";
import { editColumnAsync } from "../../redux/thunk/columnsThunk";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import css from "./EditColumn.module.css";

const EditColumn = ({ onClose }) => {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState("");
  const columns = useSelector(selectedColumn);

  const editColumn = columns.find((column) => column);
  const { _id, title } = editColumn;

  const handleTitleChange = (evt) => {
    setValueInput(evt.target.value.toString());
  };
  useEffect(() => {
    setValueInput(title);
  }, [title, setValueInput]);

  const handleEditColumn = (e) => {
    e.preventDefault();
    if (!valueInput.length) {
      return;
    }

    dispatch(editColumnAsync([_id, { title: valueInput }]));
    setValueInput("");
    e.target.reset();
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <ButtonClose onClick={onClose} />
      <h2 className={css.title}>Edit column</h2>
      <form onSubmit={handleEditColumn}>
        <input
          className={css.input}
          id="newColumn"
          name="title"
          type="text"
          placeholder={title}
          onChange={handleTitleChange}
        />
        <ButtonAdd className={css.buttonSbt} type="submit" title="Add" />
      </form>
    </div>
  );
};

export default EditColumn;
