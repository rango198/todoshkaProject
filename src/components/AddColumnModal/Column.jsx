import { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../Card/Card";
import EditColumn from "../EditColumn/EditColumn";

import sprite from "../../assets/svg/sprite.svg";
import Modal from "../Modal/Modal";

const Column = ({ column }) => {
  const { _id, title, tasks, owner, board } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((state) => !state);

  return (
    <div>
      <div>
        <span>{title}</span>
        <div>
          <button onClick={toggleModal}>
            <svg width={16} height={16} aria-label="icon-pencil">
              <title>Edit column</title>
              <use href={sprite + "#icon-pencil"} />
            </svg>
          </button>
        </div>
      </div>
      {tasks && tasks.length > 0 && (
        <ul>
          {tasks.map((taskId, index) => (
            <li key={tasks._Id}>
              <Card task={tasks.find((el) => el._id === taskId)} />
            </li>
          ))}
        </ul>
      )}
      <AddTaskCard columnId={_id} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditColumn id={_id} title={title} onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Column;
