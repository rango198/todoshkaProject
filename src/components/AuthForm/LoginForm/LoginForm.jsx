import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import Icon from ".//../../Icon/Icon";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().required("Required field"),
  password: yup
    .string()

    .required("Required field")
    .min(5, "min 5 characters"),
});

const LoginForm = () => {
  const [svg, setSvg] = useState("eye");

  const [inputType, setIputType] = useState("password");

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
    console.log(JSON.stringify(data));
    reset();
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
