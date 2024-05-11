import { useState } from "react";
//import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { deleteColumnAsync } from "../../redux/thunk/columnsThunk";

import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import EditColumn from "../EditColumn/EditColumn";
import DeletePopup from "../DeletePopup/DeletePopup";

import css from "./Column.module.css";
import Icon from "../Icon/Icon";

const Column = ({ column }) => {
  const dispatch = useDispatch();
  const { _id, title, tasks, owner, board } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const toggleModal = () => setIsModalOpen((state) => !state);

  const handleClickDelete = () => {
    setShowPopupDelete(true);
    console.log("click");
  };

  const handleCloseDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  return (
    <div className={css.container}>
      <div className={css.column_header}>
        <span>{title}</span>
        <div className={css.btn_container}>
          <button type="button" className={css.btn} onClick={toggleModal}>
            <svg className={css.icon_svg}>
              <Icon id="pencil" />
            </svg>
          </button>
          <button type="button" className={css.btn} onClick={handleClickDelete}>
            <svg className={css.icon_svg}>
              <Icon id="trash" />
            </svg>
          </button>
          {showPopupDelete && (
            <DeletePopup onClose={handleCloseDelete} id={_id} type="column" />
          )}
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
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={toggleModal}>
          <EditColumn id={_id} title={title} onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Column;
