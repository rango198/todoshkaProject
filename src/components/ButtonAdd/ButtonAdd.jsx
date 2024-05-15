import Icon from "../Icon/Icon.jsx";
import css from "./buttonAdd.module.css";

const ButtonAdd = ({ title, className, onClick, iconStyle, iconSpan }) => {
  return (
    <button onClick={onClick} className={className}>
      <span className={`${css.button_icon_bg} ${iconSpan}`}>
        <Icon id="plus" className={`${css.button_icon} ${iconStyle}`} />
      </span>
      <span className={css.button_title}>{title}</span>
    </button>
  );
};
export default ButtonAdd;
