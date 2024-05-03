import Board from "../../components/ScreensPage/Board/Board";
import Icon from "../../components/Icon/Icon";
import css from "./screensPage.module.css";
import NewBoard from "../../components/ScreensPage/NewBoard/NewBoard";

const ScreensPage = () => {
  return (
    <div className={css.screen}>
      <div className={css.title_container}>
        <span className={css.title_wrap}>
          <p className={css.title_board}>boardName</p>
        </span>
        <span className={css.title_wrap}>
          <button className={css.button_filter} type="button">
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
