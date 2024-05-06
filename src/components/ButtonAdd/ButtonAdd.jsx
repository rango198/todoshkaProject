import Icon from "../Icon/Icon.jsx";
import css from "./buttonAdd.module.css";

const ButtonAdd = ({ title, className, onClick }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      <span className={css.button_icon_bg}>
        <Icon id="plus" className={css.button_icon} />
      </span>
      <span className={css.button_title}>{title}</span>
    </button>
  );
};
export default ButtonAdd;
