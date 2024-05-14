import { useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "../../Icon/Icon";
import { toast } from "react-toastify";
import css from "./Register.module.css";

import { useDispatch } from "react-redux";
import { registerThunk } from "../../../redux/thunk/authThunk";

const schema = yup.object({
  name: yup.string().min(2).max(32).required("Required field"),
  email: yup.string().email().required("Required field"),
  password: yup
    .string()
    .required("Required field")
    .min(8, "min 8 characters")
    .max(64, "max 64 characters"),
});

const RegisterForm = () => {
  const [svg, setSvg] = useState("eye");
  const [inputType, setIputType] = useState("password");
  const dispatch = useDispatch();

  const togglePassword = () => {
    if (inputType === "password") {
      setIputType("text");
      setSvg(" ");
    } else {
      setIputType("password");
      setSvg("eye");
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        toast.success("Registration successful");
        reset();
      })
      .catch(() => {
        toast.error("Email has already in use");
      });
  };

  return (
    <form className={css.main} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={css.input}
        placeholder="Enter your name"
        {...register("name", {
          required: "Required field",
          pattern: /^[a-zA-Z0-9 !@#$%^&*()_+,.:;'"?/-]+$/,
        })}
        autoComplete="name"
      />
      <p style={{ color: "red", fontSize: "12px" }}>{errors.name?.message}</p>
      <input
        className={css.input}
        placeholder="Enter your email"
        type="email"
        {...register("email", {
          required: "Required field",
          pattern: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
        })}
        autoComplete="email"
      />
      <p style={{ color: "red", fontSize: "12px" }}>{errors.email?.message}</p>
      <div className={css.inputwithicon}>
        <input
          placeholder="Create a password"
          className={css.input}
          type={inputType}
          {...register("password", {
            required: "Required field",
            pattern: /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;'"?/]+$/,
          })}
          autocomplete="current-password"
        />
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.password?.message}
        </p>
        <div onClick={togglePassword}>
          <Icon id="eye" src={svg} className={css.svg_icon} />
        </div>
      </div>
      <div className={css.btn}>
        <button className={css.button} type="submit">
          Register Now
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
