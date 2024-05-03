import css from "./board.module.css";

const Board = () => {
  return (
    <div className={css.container}>
      Before starting your project, it is essential{" "}
      <button type="button" className={css.button_text}>
        {" "}
        to create a board{" "}
      </button>{" "}
      to visualize and track all the necessary tasks and milestones. This board
      serves as a powerful tool to organize the workflow and ensure effective
      collaboration among team members.
    </div>
  );
};

export default Board;
