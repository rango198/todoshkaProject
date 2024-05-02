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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.block}>
          Enter your name:
          <input
            {...register("firstName", {
              required: "Required field",
            })}
          />
        </label>
        <label className={styles.block}>
          Enter your email:
          <input type="email" {...register("email", { required: true })} />
        </label>
        <label className={styles.block}>
          Create a password:
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 5,
                message: "min 5 characters",
              },
            })}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.firstName && <p>{errors?.firstName?.message || "Error!"}</p>}
          {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
          {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
        </div>
        <button type="submit">Register Now</button>
      </form>
    </div>
  );
}

export default RegisterForm;
