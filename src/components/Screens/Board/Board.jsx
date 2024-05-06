import { useState } from "react";

import Modal from "../../Modal/Modal";
import CreateNewBoardModal from "../../CreateNewBoardModal/CreateNewBoardModal";

import css from "./Board.module.css";

const Board = () => {
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  const toggle = () => {
    setIsAddBoardOpen(!isAddBoardOpen);
  };

  return (
    <>
      <p className={css.container}>
        Before starting your project, it is essential{" "}
        <button className={css.button_text} onClick={toggle}>
          {" "}
          to create a board{" "}
        </button>{" "}
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>
      {isAddBoardOpen && (
        <Modal onClose={toggle}>
          <CreateNewBoardModal onClose={toggle} />
        </Modal>
      )}
      {/* {isAddBoardOpen && (
        <Modal open={toggle}>
          <CreateNewBoardModal onClose={toggle} />
        </Modal>
      )} */}
      <Modal open={isAddBoardOpen} onClose={toggle}>
        <CreateNewBoardModal onClose={toggle} />
      </Modal>
    </>
  );
};

export default Board;
