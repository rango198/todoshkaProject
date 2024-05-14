import React, { useState, useEffect } from "react";
import Column from "../Column/Column";

export const FilteredColumns = ({ columns, filter }) => {
  const [filteredColumns, setFilteredColumns] = useState(columns);

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
      {filteredColumns?.map((column) => {
        return <Column key={column._id} column={column} />;
      })}
    </>
  );
};
