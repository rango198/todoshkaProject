import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBoardThunk } from "../../../redux/thunk/servicesThunk";
import css from "./ListBoards.module.css";
import Icon from "../../Icon/Icon";
import Modal from "../../Modal/Modal";
import EditBoardModal from "../../ModalBoard/EditBoardModal/EditBoardModal";

const BoardItem = ({ isActive, title, icon, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [click, setClick] = useState(false);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  // const activeBoard = () => {
  //   setClick(true);
  // };
  // const openModalBoard = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModalBoard = () => {
  //   setIsModalOpen(false);
  // };

  const handleDelete = () => {
    dispatch(deleteBoardThunk(id));
    setClick(true);
  };

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
            onClick={toggle}
            className={css.sidebarNewBoardButton}
            type="button"
          >
            <svg className={css.sidebarNewBoardIcon}>
              <Icon id="pencil" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className={css.sidebarNewBoardButtonCurrent}
            type="button"
          >
            <svg className={css.sidebarNewBoardIcon}>
              <Icon id="trash" />
            </svg>
          </button>
        </div>
      </Link>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={toggle}>
          <EditBoardModal onClose={toggle} />
        </Modal>
      )}
    </>
  );
};

export default BoardItem;
