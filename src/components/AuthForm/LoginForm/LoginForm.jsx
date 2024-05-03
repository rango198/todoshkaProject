import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Login.module.css";
import Icon from ".//../../Icon/Icon";

const schema = yup
  .object({
    email: yup.string().required("Required field"),
    password: yup
      .string()

      .required("Required field")
      .min(5, "min 5 characters"),
  })
  .required();

const LoginForm = () => {
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

        <input
          className={styles.input}
          type="password"
          {...register("password")}
          placeholder=" Create a password"
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>

        <button className={styles.btn} type="submit">
          Log in Now
        </button>
        <div className={styles.svg}>
          <Icon id="eye" className={styles.svg_icon} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
