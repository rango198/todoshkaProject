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
  selectedColumn,
  getFilter,
  selectedBoard,
} from "../../../redux/selectors/serviceSelector";
import { FilteredColumns } from "../../FiltredColumns/FiltredColumns";

const NewBoard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { columns } = useSelector(selectedBoard);
  const filter = useSelector(getFilter);

  const toggleAddColumn = () => {
    dispatch(
      setModalContent({
        action: "addColumn",
      })
    );
    dispatch(setModalStatus(true));
  };

  useEffect(() => {
    if (params.boardName) {
      dispatch(fetchSingleBoard(params.boardName));
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
