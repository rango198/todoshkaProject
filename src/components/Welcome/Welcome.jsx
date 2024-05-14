import css from "./welcome.module.css";
import start from "../../assets/img/png/Start-mob-2x.png";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import {
  imageAnimation,
  logoAnimation,
  titleAnimation,
  textAnimation,
} from "./WelcomeAnimation";
import { motion } from "framer-motion";
const Welcome = () => {
  return (
    <div className={css.section_welcome}>
      <motion.div
        initial={imageAnimation.initial}
        animate={imageAnimation.animate}
        transition={imageAnimation.transition}
      >
        <img className={css.welcome_img} src={start} alt="Hello image"></img>
      </motion.div>
      <div className={css.logo}>
        <motion.div
          initial={logoAnimation.initial}
          animate={logoAnimation.animate}
          transition={logoAnimation.transition}
        >
          <Icon id="logo" className={css.logo_icon} />
        </motion.div>
        <motion.div
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          transition={titleAnimation.transition}
        >
          Task Pro
        </motion.div>
      </div>
      <motion.div
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        <p className={css.text}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
      </motion.div>
      <div className={css.btnContainer}>
        <NavLink to="/auth/register">
          <button className={css.btn_r} type="button" autoFocus>
            Registration
          </button>
        </NavLink>
        <NavLink to="/auth/login">
          <button className={css.btn_l} type="button">
            Log In
          </button>
        </NavLink>
      </div>
    </div>
  );
};
export default Welcome;
