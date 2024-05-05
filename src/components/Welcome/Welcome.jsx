import css from "./welcome.module.css";
import start from "../../assets/img/png/Start-mob-2x.png";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
const Welcome = () => {
  return (
    <div className={css.section_welcome}>
      <img className={css.welcome_img} src={start} alt="Hello image"></img>
      <div className={css.logo}>
        <Icon id="logo" className={css.logo_icon} />
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
    </div>
  );
};
export default Welcome;
