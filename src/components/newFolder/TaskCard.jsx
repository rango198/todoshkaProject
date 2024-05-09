import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
      disabled: editMode,
    });

  const style = {
    transition,
    transform: transform ? `translate3d(${transform.x}px, 0, 0)` : undefined,
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div ref={setNodeRef} style={style}>
        <textarea
          {...attributes}
          {...listeners}
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p>{task.content}</p>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          del
        </button>
      )}
    </div>
  );
}

export default TaskCard;
