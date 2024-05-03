import Icon from "../Icon/Icon.jsx";
import css from "./buttonAdd.module.css";

const ButtonAdd = ({ title, className }) => {
  return (
    <button className={className} type="button">
      <div className={css.button_icon_bg}>
        <Icon id="plus" className={css.button_icon} />
      </div>
      <p className={css.button_title}>{title}</p>
    </button>
  );
};
export default ButtonAdd;
