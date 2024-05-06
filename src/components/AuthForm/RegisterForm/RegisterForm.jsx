import { useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "../../Icon/Icon";
import { toast } from "react-toastify";
import styles from "./Register.module.css";

import { useDispatch } from "react-redux";
import { registerThunk } from "../../../redux/thunk/authThunk";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/selectors/selector";

const schema = yup.object({
  name: yup.string().min(2).max(32).required("Required field"),
  email: yup.string().email().required("Required field"),
  password: yup
    .string()
    .required("Required field")
    .min(8, "min 8 characters")
    .max(64),
});

const RegisterForm = () => {
  const login = useSelector(selectIsLoggedIn);
  console.log("====================================");
  console.log(login);
  console.log("====================================");

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
      .catch((error) => {
        toast.error(`Registration failed: ${error}`);
      });
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Enter your name"
        {...register("name", {
          required: "Required field",
        })}
      />

      <input
        className={styles.input}
        placeholder="Enter your email"
        type="email"
        {...register("email", { required: true })}
      />
      <div className={styles.inputwithicon}>
        <input
          placeholder="Create a password"
          className={styles.input}
          type={inputType}
          {...register("password", {
            required: true,
          })}
        />

        <div onClick={togglePassword}>
          <Icon id="eye" src={svg} className={styles.svg_icon} />
        </div>
      </div>

      <div style={{ height: 20, color: "red" }}>
        {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
      </div>
      <div className={styles.btn}>
        <button className={styles.button} type="submit">
          Register Now
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
