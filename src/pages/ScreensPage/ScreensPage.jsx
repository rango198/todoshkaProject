import React, { useEffect, useState } from "react";

import Board from "../../components/ScreensPage/Board/Board.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import css from "./ScreenPage.module.css";
import NewBoard from "../../components/ScreensPage/NewBoard/NewBoard.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import { getFilter } from "../../redux/selectors/serviceSelector.js";
import { useSelector } from "react-redux";

const ScreensPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const filter = useSelector(getFilter);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <div className={css.screen}>
      {openFilter && (
        <Modal open={handleOpenFilter} onClose={toggleFilter}>
          <Filter onClose={toggleFilter} />
        </Modal>
      )}
      <div className={css.title_container}>
        <span className={css.title_wrap}>
          <p className={css.title_board}>boardName</p>
        </span>
        <span className={css.title_wrap}>
          <button
            className={css.button_filter}
            type="button"
            onClick={handleOpenFilter}
          >
            <Icon id="filter" className={css.button_filter_icon} />
            Filter
          </button>
        </span>
      </div>
      <NewBoard />
      <Board />
    </div>
  );
};

export default ScreensPage;
