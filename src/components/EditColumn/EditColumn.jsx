import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ButtonClose from "../ButtonClose/ButtonClose";

import { editColumnAsync } from "../../redux/thunk/columnsThunk";

import css from "./EditColumn.module.css";

const TitleSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Title is required"),
}).required();

const EditColumn = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(TitleSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();


  return (
    <div className={css.wrapper}>
      <ButtonClose onClick={onClose} />
      <h2 className={css.title}>Edit column</h2>
      <form onSubmit={}>
        <input
          className={css.input}
          id=""
          name="title"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <ButtonAdd className={css.buttonSbt} type="submit" title="Add" />
      </form>
    </div>
  );
};

export default EditColumn;
