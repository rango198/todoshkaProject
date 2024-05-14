import { useSelector } from "react-redux";
import BoardItem from "./BoardItem";
import { selectedBoard } from "../../../redux/selectors/serviceSelector";
import css from "./ListBoards.module.css";

const ListBoards = ({ boards }) => {
  const currentBoard = useSelector(selectedBoard);

  return (
    <ul className={css.sidebarNewBoard}>
      {boards?.map(({ title, icon, _id }) => (
        <li key={_id}>
          <BoardItem
            title={title}
            icon={icon}
            isActive={_id === currentBoard?._id}
            id={_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListBoards;
