import css from "./welcome.module.css";
import start from "../../assets/img/png/Start-mob-2x.png";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";
const Welcome = () => {
  return (
    <>
      <img className={css.welcome_img} src={start} alt="Hello image"></img>
      <div className={css.logo}>
        <div className={css.logo_icon}>
          <Icon
            styles={{ stroke: "#fff" }}
            width={16}
            height={20}
            iconId={"icon-logo"}
          />
        </div>
        Task Pro
      </div>
      <p className={css.text}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>
      <div>
        <NavLink to="/auth/register">
          <button className={css.btn} type="button">
            Registration
          </button>
        </NavLink>
        <NavLink to="/auth/login">
          <button className={css.btn} type="button">
            Log In
          </button>
        </NavLink>
      </div>
    </>
  );
};
export default Welcome;
