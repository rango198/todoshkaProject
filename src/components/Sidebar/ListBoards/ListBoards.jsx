import { useSelector } from "react-redux";
import BoardItem from "./BoardItem";
import {
  selectAllBoards,
  selectedBoard,
} from "../../../redux/selectors/serviceSelector";
import css from "./ListBoards.module.css";

const ListBoards = ({ boards }) => {
  // const boards = useSelector(selectAllBoards);
  const currentBoard = useSelector(selectedBoard);
  console.log(boards);
  return (
    <ul className={css.sidebarNewBoard}>
      {boards.map(({ title, icon, _id }) => (
        <li key={_id}>
          <BoardItem
            title={title}
            icon={icon}
            isActive={_id === currentBoard._id}
            id={_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListBoards;
