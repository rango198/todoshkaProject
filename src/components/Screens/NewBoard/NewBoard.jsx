import { useEffect, useState } from "react";

import Modal from "../../Modal/Modal";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import AddColumnModal from "../../AddColumnModal/AddColumModal";

import css from "./NewBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsBoardsLoading,
  selectedBoard,
} from "../../../redux/selectors/serviceSelector";
import { useParams } from "react-router";
import { fetchSingleBoard } from "../../../redux/thunk/servicesThunk";

const NewBoard = () => {
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const toggleAddColumn = () => {
    setIsAddColumnOpen(!isAddColumnOpen);
  };
  const isLoading = useSelector(selectIsBoardsLoading);

  useEffect(() => {
    if (params.boardName) {
      dispatch(fetchSingleBoard(params.boardName));
    }
  }, [dispatch, params.boardName]);

  return (
    <div className={css.task_list_container}>
      <ButtonAdd
        onClick={toggleAddColumn}
        title="Add another column"
        className={css.button_create}
      />
      <Modal open={isAddColumnOpen} onClose={toggleAddColumn}>
        <AddColumnModal onClose={toggleAddColumn} />
      </Modal>
    </div>
  );
};

export default NewBoard;
