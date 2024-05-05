import { useState } from "react";
import ButtonAdd from "../../ButtonAdd/ButtonAdd.jsx";
import css from "./NewBoard.module.css";
import Modal from "../../Modal/Modal.jsx";
import AddColumnModal from "../../AddColumnModal/AddColumModal.jsx";
const NewBoard = () => {
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const toggleAddColumn = () => {
    setIsAddColumnOpen(!isAddColumnOpen);
  };
  const handleOpenAddColumn = () => {
    setIsAddColumnOpen(true);
  };
  return (
    <>
      <ButtonAdd
        click={toggleAddColumn}
        title="Add another column"
        className={css.button_create}
      />
      {isAddColumnOpen && (
        <Modal open={handleOpenAddColumn} onClose={toggleAddColumn}>
          <AddColumnModal onClose={toggleAddColumn} />
        </Modal>
      )}
    </>
  );
};
export default NewBoard;
