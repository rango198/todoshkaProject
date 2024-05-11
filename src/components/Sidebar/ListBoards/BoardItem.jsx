import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { deleteBoardThunk } from "../../../redux/thunk/servicesThunk";
import Icon from "../../Icon/Icon";
import Modal from "../../Modal/Modal";
import EditBoardModal from "../../ModalBoard/EditBoardModal/EditBoardModal";
import DeletePopup from "../../DeletePopup/DeletePopup";
import css from "./ListBoards.module.css";
// import DeleteBoardModal from "../../ModalBoard/DeleteBoard/DeleteBoardModal";

const BoardItem = ({ isActive, title, icon, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleClickDelete = () => {
    setShowPopupDelete(true);
    console.log("click");
  };

  const handleCloseDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  const toggleEdit = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };
  // const toggleDelete = () => {
  //   setIsDeleteModalOpen(!isDeleteModalOpen);
  // };
  // const handleDelete = () => {
  //   dispatch(deleteBoardThunk(id));
  //   setClick(true);
  // };

  useEffect(() => {
    if (click) {
      navigate("/home");
    }
  }, [click, navigate]);

  return (
    <>
      <Link to={`/home/${id}`}>
        <div className={css.sidebarNewBoardList} data-isactive={isActive}>
          <svg className={css.sidebarNewBoardSvg}>
            <Icon id={icon} />
          </svg>
          <p className={css.sidebarNewBoardItem}>{title}</p>
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
      {/* {isDeleteModalOpen && (
        <Modal open={isDeleteModalOpen} onClose={toggleDelete}>
          <DeleteBoardModal onClose={toggleDelete} />
        </Modal>
      )} */}
    </>
  );
};

export default BoardItem;
