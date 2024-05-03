import { useForm } from "react-hook-form";
import styles from "./Register.module.css";

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };
  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Enter your name"
        {...register("firstName", {
          required: "Required field",
        })}
      />

      <input
        className={styles.input}
        placeholder="Enter your email"
        type="email"
        {...register("email", { required: true })}
      />

      <input
        placeholder="Create a password"
        className={styles.input}
        type="password"
        {...register("password", {
          required: true,
          minLength: {
            value: 5,
            message: "min 5 characters",
          },
        })}
      />

      <div style={{ height: 20, color: "red" }}>
        {errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}
        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
        {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
      </div>
      <div className={styles.btn}>
        <button className={styles.button} type="submit">
          <p className={styles.buttonname}> Register Now</p>
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
