import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import flower from "../../assets/img/png/flower.png";
import flowerTwoX from "../../assets/img/png/flower@2x.png";
import flowerThreeX from "../../assets/img/png/flower@3x.png";
import { logoutThunk } from "../../redux/thunk/authThunk.js";
import css from "./Sidebar.module.css";
import Icon from "../Icon/Icon";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice.js";
import CreateNewBoardModal from "../ModalBoard/CreateNewBoardModal/CreateNewBoardModal.jsx";
import Modal from "../Modal/Modal.jsx";
import { selectAllBoards } from "../../redux/selectors/serviceSelector.js";
import ListBoards from "./ListBoards/ListBoards.jsx";

const SidebarActive = () => {
  const boards = useSelector(selectAllBoards);
  const dispatch = useDispatch();
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const toggleAddBoard = () => {
    setIsAddBoardOpen(!isAddBoardOpen);
  };

  const handleClickHelp = () => {
    dispatch(
      setModalContent({
        action: "help",
      })
    );
    dispatch(setModalStatus(true));
  };
  const handleClickLogout = () => dispatch(logoutThunk());

  return (
    <div>
      <aside className={css.sidebar}>
        <div>
          <section className={css.sidebarBox}>
            <div className={css.logo}></div>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </section>
          <div className={css.sidebarItem}>
            <p className={css.sidebarItemTitle}>My boards</p>
          </div>
          <section className={css.sidebarBoard}>
            <p className={css.sidebarBoardSubItem}>Create a new board</p>
            <button
              onClick={toggleAddBoard}
              className={css.sidebarBoardButton}
              type="button"
              aria-label="add board"
            >
              <svg className={css.sidebarBoardIcon}>
                <Icon id="icon-icon-plus" />
              </svg>
            </button>
            <Modal open={isAddBoardOpen} onClose={toggleAddBoard}>
              <CreateNewBoardModal onClose={toggleAddBoard} />
            </Modal>
          </section>
          <ListBoards boards={boards} />
        </div>
        <div>
          <section className={css.sidebarHelp}>
            <div className={css.img_help}>
              <picture>
                <source
                  srcSet={`${flower} 1x, ${flowerTwoX} 2x,${flowerThreeX} 3x`}
                />
                <img srcSet={`${flower} 1x`} alt="cactus" />
              </picture>
            </div>
            <div className={css.sidebarHelpBox}>
              <p className={css.sidebarHelpBoxItem}>
                If you need help with{" "}
                <a className={css.sidebarHelpBoxLink} href="/#">
                  TaskPro
                </a>
                , check out our support resources or reach out to our customer
                support team.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClickHelp}
              className={css.sidebarHelpbutton}
              aria-label="help"
            >
              <svg className={css.sidebarHelpIcon}>
                <Icon id="help_circle" />
              </svg>
              <p className={css.sidebarHelpNeedHelp}>Need help?</p>
            </button>
          </section>
          <section className={css.sidebarLogout}>
            <button
              onClick={handleClickLogout}
              className={css.sidebarLogoutButton}
              type="button"
              aria-label="logout"
            >
              <svg className={css.sidebarLogoutIcon} width={32} height={32}>
                <Icon id="log-out" />
              </svg>
              Log out
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default SidebarActive;
