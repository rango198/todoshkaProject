import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";

import { selectedColumn } from "../../redux/selectors/serviceSelector";

import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import EditColumn from "../EditColumn/EditColumn";
import DeletePopup from "../DeletePopup/DeletePopup";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

import css from "./Column.module.css";
import Icon from "../Icon/Icon";

const Column = ({ column }) => {
  const { _id, title, tasks, owner, board } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const toggleModal = () => setIsModalOpen((state) => !state);

  const columnId = useSelector(selectedColumn);

  const dispatch = useDispatch();

  const toggleAddCard = () => {
    dispatch(
      setModalContent({
        action: "addCard",
        AddId: { _id },
      })
    );
    dispatch(setModalStatus(true));
  };

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

      <ul className={css.container_task}>
        {tasks?.map((task) => (
          <li className={css.item_task} key={task._id}>
            <Card task={task} columnId={columnId} />
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={toggleModal}>
          <EditColumn id={_id} title={title} onClose={toggleModal} />
        </Modal>
      )}
      <ButtonAdd
        onClick={toggleAddCard}
        title="Add another card"
        className={css.button_create}
      />
    </div>
  );
};

export default Column;
