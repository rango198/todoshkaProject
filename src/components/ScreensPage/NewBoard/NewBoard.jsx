import ButtonAdd from "../../ButtonAdd/ButtonAdd.jsx";
import css from "../NewBoard/newBoard.module.css";
const NewBoard = () => {
  return (
    <>
      <ButtonAdd title="Add another column" className={css.button_create} />
    </>
  );
};
export default NewBoard;
