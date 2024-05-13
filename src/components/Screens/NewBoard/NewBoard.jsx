import { useEffect, useState } from "react";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import Column from "../../Column/Column";

import css from "./NewBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSingleBoard } from "../../../redux/thunk/servicesThunk";
import {
  setModalContent,
  setModalStatus,
} from "../../../redux/slice/servicesSlice";
import {
  selectAllBoards,
  selectedColumn,
} from "../../../redux/selectors/serviceSelector";

const NewBoard = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const toggleAddColumn = () => {
    dispatch(
      setModalContent({
        action: "addColumn",
      })
    );
    dispatch(setModalStatus(true));
  };
  const boards = useSelector(selectAllBoards);
  const columns = useSelector(selectedColumn);
  const title = boards.find((board) => board.title === params.boardName);

  useEffect(() => {
    if (params.boardName === title?.title) {
      dispatch(fetchSingleBoard(title?._id || boards[0]._id));
    }
  }, [dispatch, params.boardName]);

  return (
    <div className={css.container}>
      <div className={css.columns_container}>
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        <ButtonAdd
          onClick={toggleAddColumn}
          title="Add another column"
          className={css.button_create}
        />
      </div>
    </div>
  );
};

export default NewBoard;
