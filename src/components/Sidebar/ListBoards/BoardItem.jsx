import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../Icon/Icon";
import Modal from "../../Modal/Modal";
import EditBoardModal from "../../ModalBoard/EditBoardModal/EditBoardModal";
import DeletePopup from "../../DeletePopup/DeletePopup";
import css from "./ListBoards.module.css";

const BoardItem = ({ isActive, title, icon, id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleClickDelete = () => {
    setShowPopupDelete(true);
  };

  const handleCloseDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  const toggleEdit = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <Link to={title ? `/home/${title}` : "/home"}>
        <div
          className={`${css.sidebarNewBoardList} ${isActive ? css.active : ""}`}
          data-isactive={isActive}
        >
          <svg className={css.sidebarNewBoardSvg}>
            <Icon id={icon} />
          </svg>
          <p className={css.sidebarNewBoardItem}>{title}</p>
          {isActive && (
            <>
              <button
                onClick={toggleEdit}
                className={css.sidebarNewBoardButton}
                type="button"
              >
                <svg className={css.sidebarNewBoardIcon}>
                  <Icon id="pencil" />
                </svg>
              </button>
              <button
                onClick={handleClickDelete}
                className={css.sidebarNewBoardButtonCurrent}
                type="button"
              >
                <svg className={css.sidebarNewBoardIcon}>
                  <Icon id="trash" />
                </svg>
              </button>
            </>
          )}
        </div>
      </Link>
      {showPopupDelete && (
        <DeletePopup onClose={handleCloseDelete} id={id} type="board" />
      )}
      {isEditModalOpen && (
        <Modal open={isEditModalOpen} onClose={toggleEdit}>
          <EditBoardModal onClose={toggleEdit} />
        </Modal>
      )}
    </>
  );
};

export default BoardItem;
