import { useEffect, useState } from "react";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import css from "./NewBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSingleBoard } from "../../../redux/thunk/servicesThunk";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/slice/servicesSlice";
import {
  selectedColumn,
  getFilter,
  selectedBoard,
  selectAllBoards,
} from "../../../redux/selectors/serviceSelector";
import { FilteredColumns } from "../../FiltredColumns/FiltredColumns";
import { useNavigate } from "react-router-dom";

const NewBoard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { filterColumns } = useSelector(selectedBoard);
  const filter = useSelector(getFilter);
  const boards = useSelector(selectAllBoards);
  const columns = useSelector(selectedColumn);

  const toggleAddColumn = () => {
    dispatch(
      setModalContent({
        action: "addColumn",
      })
    );
    dispatch(setModalStatus(true));
  };

  const title = boards.find((board) => board.title === params.boardName);

  useEffect(() => {
    if (params.boardName && params.boardName === title?.title) {
      dispatch(fetchSingleBoard(title?._id || boards[0]?._id));
      navigate(`/home/${title?.title}`);
    }
  }, [dispatch, params.boardName]);

  return (
    <div className={css.container}>
      <div className={css.columns_container}>
        {columns && columns.length > 0 ? (
          <>
            <FilteredColumns columns={columns} filter={filter} />

            <ButtonAdd
              onClick={toggleAddColumn}
              title="Add another column"
              className={css.button_create}
            />
          </>
        ) : (
          <ButtonAdd
            onClick={toggleAddColumn}
            title="Add another column"
            className={css.button_create}
          />
        )}
      </div>
    </div>
  );
};

export default NewBoard;
