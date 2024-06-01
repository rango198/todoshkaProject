import React, { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
// import TaskCard from "./TaskCard";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  // createTask,
  // tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  // const tasksIds = useMemo(() => {
  //   return tasks.map((task) => task.id);
  // }, [tasks]);

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
    disabled: editMode,
  });

  const style = {
    transition,
    transform: transform ? `translate3d(${transform.x}px, 0, 0)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      // style={style}
      style={{
        ...style,
        backgroundColor: "#231c2b",
        width: "350px",
        height: "500px",
        maxHeight: "500px",
        borderRadius: "0.375rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div {...attributes} {...listeners}>
        {/* Column title */}
        <div style={{ display: "flex", margin: "10px" }}>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#231c2b",
              padding: "5px 10px",
              fontSize: "0.875rem",
              borderRadius: "9999px",
            }}
          >
            {/* {tasks.length} */}
          </p>
          {!editMode && (
            <span
              style={{
                width: "100%",
                backgroundColor: "#231c2b",
                fontSize: "1rem",
                height: "60px",
                cursor: "grab",
                borderRadius: "0.375rem",
                borderBottomLeftRadius: "0",
                padding: "0.75rem",
                fontWeight: "bold",
                border: "4px solid #301212",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => setEditMode(true)}
            >
              {column.title}
            </span>
          )}

          {editMode && (
            <input
              style={{
                backgroundColor: "#251a29",
                focusBorderColor: "#212121",
                border: "1px solid",
                borderRadius: "0.375rem",
                outline: "none",
                padding: "20px",
              }}
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
          <button
            style={{
              backgroundColor: "#251a29",
              "&:hover": {
                color: "white",
                backgroundColor: "#251a29",
              },
              borderRadius: "0.375rem",
              padding: "15px 10px",
            }}
            onClick={() => {
              deleteColumn(column.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Column task container */}
      <div>
        {/* <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext> */}
      </div>
      {/* Column footer */}
      <button
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          border: "2px solid #212121",
          borderRadius: "0.375rem",
          padding: "1rem",
          borderXColor: "#212121",
          backgroundColor: "#5d4266",
          fontSize: "16px",
        }}
        onClick={() => {
          createTask(column.id);
        }}
      >
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
