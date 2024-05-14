import Icon from "../Icon/Icon.jsx";
import css from "./ButtonClose.module.css";

const ButtonClose = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={css.close_btn}
      type="button"
      title="Close"
    >
      <Icon id="close" className={css.close_svg} />
    </button>
  );
};
export default ButtonClose;
