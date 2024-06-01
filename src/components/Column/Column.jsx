import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setModalContent,
  setModalStatus,
} from "../../redux/slice/servicesSlice";
import Card from "../Card/Card";
import DeletePopup from "../DeletePopup/DeletePopup";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import css from "./Column.module.css";
import Icon from "../Icon/Icon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

const Column = ({ column }) => {
  const { _id, title, tasks } = column;
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task._id);
  }, [tasks]);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: {
      type: "Column",
      column,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: transform ? `translate3d(${transform.x}px, 0, 0)` : undefined,
  };
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const dispatch = useDispatch();

  const editColumn = (id) => {
    dispatch(
      setModalContent({
        action: "editColumn",
        AddId: { id },
        recordDataEdit: { title },
      })
    );
    dispatch(setModalStatus(true));
  };

  const toggleAddCard = () => {
    dispatch(
      setModalContent({
        action: "addCard",
        AddId: { _id },
      })
    );
    dispatch(setModalStatus(true));
  };

  const handleClickDelete = () => {
    setShowPopupDelete(true);
  };

  const handleCloseDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  return (
    <div
      className={css.container}
      style={{ ...style }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className={css.column_header}>
        <span>{title}</span>
        <div className={css.btn_container}>
          <button
            type="button"
            className={css.btn}
            aria-label="Edit column"
            onClick={() => editColumn(_id)}
          >
            <svg className={css.icon_svg}>
              <Icon id="pencil" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Delete"
            className={css.btn}
            onClick={handleClickDelete}
          >
            <svg className={css.icon_svg}>
              <Icon id="trash" />
            </svg>
          </button>
          {showPopupDelete && (
            <DeletePopup onClose={handleCloseDelete} id={_id} type="column" />
          )}
        </div>
      </div>

      <ul className={css.container_task}>
        <SortableContext items={tasksIds}>
          {tasks?.map((task) => (
            <li key={task._id} className={css.item_task}>
              <Card task={task} />
            </li>
          ))}
        </SortableContext>
      </ul>
      <ButtonAdd
        onClick={toggleAddCard}
        title="Add another card"
        className={css.button_create}
      />
    </div>
  );
};

export default Column;
