import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../../components/Screens/Board/Board";
import Icon from "../../components/Icon/Icon";
import css from "./ScreenPage.module.css";
import NewBoard from "../../components/Screens/NewBoard/NewBoard";
import Modal from "../../components/Modal/Modal";
import Filter from "../../components/Filter/Filter";
import {
  selectAllBoards,
  selectedBoard,
} from "../../redux/selectors/serviceSelector";
import Header from "../../components/Header/Header";

const ScreensPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const isBoards = useSelector(selectAllBoards);
  const [color, setColor] = useState(null);
  const board = useSelector(selectedBoard);

  useEffect(() => {
    reloadColor(board?.background);
  }, [board?.background]);

  const reloadColor = (background) => {
    if (background === "default") {
      setColor(null);
    } else {
      setColor(background);
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className={color ? `background-${color}` : "background-color-body"}>
      <div className={css.screen}>
        <Header />
        {openFilter && (
          <Modal open={handleOpenFilter} onClose={toggleFilter}>
            <Filter onClose={toggleFilter} />
          </Modal>
        )}

        <div className={css.title_container}>
          <span className={css.title_wrap}>
            <p className={css.title_board}>{board?.title}</p>
          </span>
          <span className={css.title_wrap}>
            <button
              className={css.button_filter}
              type="button"
              aria-label="Filter"
              onClick={handleOpenFilter}
            >
              <Icon id="filter" className={css.button_filter_icon} />
              Filter
            </button>
          </span>
        </div>
        {isBoards?.length === 0 ? <Board /> : <NewBoard />}
      </div>
    </div>
  );
};

export default ScreensPage;
