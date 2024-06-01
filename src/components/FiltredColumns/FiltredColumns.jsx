import { useState, useEffect, useMemo } from "react";
import Column from "../Column/Column";
import KanbanBoard from "../newFolder/Board";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export const FilteredColumns = ({ columns, filter }) => {
  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);
  const [task, setTasks] = useState(null);
  const [filteredColumns, setFilteredColumns] = useState(columns);

  const columnsId = useMemo(
    () => filteredColumns?.map((col) => col._id),
    [filteredColumns]
  );

  useEffect(() => {
    const updatedFilteredColumns = columns?.map((column) => {
      if (column?.tasks) {
        return {
          ...column,
          tasks: column.tasks.filter((card) => {
            if (filter === "all") return true;
            return card.priority === filter;
          }),
        };
      } else {
        return column;
      }
    });
    setFilteredColumns(updatedFilteredColumns);
  }, [columns, filter]);

  return (
    <>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext
          items={columnsId}
          strategy={horizontalListSortingStrategy}
        >
          {filteredColumns?.map((column) => (
            <Column key={column._id} column={column} />
          ))}
          {/* <KanbanBoard columns={columns} /> */}
        </SortableContext>
      </DndContext>
    </>
  );
  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setFilteredColumns((filteredColumns) => {
      const activeColumnIndex = filteredColumns.findIndex(
        (col) => col._id === activeId
      );

      const overColumnIndex = filteredColumns.findIndex(
        (col) => col._id === overId
      );
      return arrayMove(filteredColumns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};
