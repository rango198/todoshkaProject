import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import Icon from ".//../../Icon/Icon";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginThunk } from "../../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";

const schema = yup.object({
  email: yup.string().required("Required field"),
  password: yup
    .string()
    .required("Required field")
    .min(8, "min 8 characters")
    .max(64),
});

const LoginForm = () => {
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
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
        reset();
      })
      .catch((error) => {
        toast.error(`Login failed: ${error}`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          {...register("email")}
          placeholder="Enter your email"
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <div className={styles.inputwithicon}>
          <input
            className={styles.input}
            type={inputType}
            {...register("password")}
            placeholder=" Create a password"
          />

          <div onClick={togglePassword}>
            <Icon id="eye" className={styles.svg_icon} src={svg} />
          </div>
        </div>

        <p style={{ color: "red" }}>{errors.password?.message}</p>

        <button className={styles.btn} type="submit">
          Log in Now
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
