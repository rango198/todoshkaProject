import { useDispatch } from "react-redux";
import { logout } from "../../service/api.js";
import flower from "../../assets/img/png/flower.png";
import flowerTwoX from "../../assets/img/png/flower@2x.png";
import flowerThreeX from "../../assets/img/png/flower@3x.png";

import css from "./Sidebar.module.css";
import Icon from "../Icon/Icon";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice.js";

const SidebarActive = ({ boards }) => {
  const dispatch = useDispatch();

  const handleClickBoard = () => {
    console.log("Click");
  };

  const handleClickHelp = () => {
    dispatch(
      setModalContent({
        action: "help",
      })
    );
    dispatch(setModalStatus(true));
  };

  const handleClickLogout = () => {
    console.log("Click");
  };

  return (
    <div>
      <aside className={css.sidebar}>
        <div>
          <section className={css.sidebarBox}>
            <svg className={css.sidebarBoxIcon}>
              <Icon id="logo" />
            </svg>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </section>
          <div className={css.sidebarItem}>
            <p className={css.sidebarItemTitle}>My boards</p>
          </div>
          <section className={css.sidebarBoard}>
            <p className={css.sidebarBoardItem}>Create a new board</p>
            <button
              onClick={handleClickBoard}
              className={css.sidebarBoardButton}
              type="button"
            >
              <svg className={css.sidebarBoardIcon}>
                <Icon id="icon-icon-plus" />
              </svg>
            </button>
            {/*тут потрібно буду додати дві модалки видалення і створення які будуть створені в окремому компоненті і імпортовані*/}
          </section>
          {/*{boards && (*/} {/*відмальовуєм коли користувач за лог*/}
          {/* <ul className={css.sidebarNewBoard}>
            <li className={css.sidebarNewBoardList}>
              <svg className={css.sidebarNewBoardSvg}>
                <Icon id="project" />
              </svg>
              <p className={css.sidebarNewBoardItem}>Project office</p>
              <button className={css.sidebarNewBoardButton} type="button">
                <svg className={css.sidebarNewBoardIcon}>
                  <Icon id="pencil" />
                </svg>
              </button>
              <button
                className={css.sidebarNewBoardButtonCurrent}
                type="button"
              >
                <svg className={css.sidebarNewBoardIcon}>
                  <Icon id="trash" />
                </svg>
              </button>
            </li>
          </ul>
          <ul className={css.sidebarNewBoardNeon}>
            <li className={css.sidebarNewBoardList}>
              <svg className={css.sidebarNewBoardIcon}>
                <Icon id="puzzle-piece" />
              </svg>
              <li className={css.sidebarNewBoardList}>
                <p className={css.sidebarItemNeon}>Neon Light Project</p>
              </li>
            </li>
          </ul> */}
          {/*)}*/}
        </div>
        <div>
          <section className={css.sidebarHelp}>
            <div>
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
            <button onClick={handleClickHelp} className={css.sidebarHelpbutton}>
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
