import Icon from "../Icon/Icon.jsx";
import css from "./buttonAdd.module.css";

const ButtonAdd = ({ title, className, click }) => {
  return (
    <button onClick={click} className={className} type="button">
      <span className={css.button_icon_bg}>
        <Icon id="plus" className={css.button_icon} />
      </span>
      <p className={css.button_title}>{title}</p>
    </button>
  );
};
export default ButtonAdd;
