import Column from "../Column/Column";

export const FilteredColumns = ({ columns, filter }) => {
  //   const filteredColumns = columns.map((column) => {
  //     if (column.tasks) {
  //       return {
  //         ...column,
  //         tasks: column.tasks.filter((card) => {
  //           if (filter === "all") return true; // If filter is 'all', return all cards
  //           return card.priority === filter; // Otherwise, filter by priority
  //         }),
  //       };
  //     } else {
  //       return column; // Return column unchanged if no tasks
  //     }
  //   });

  const filteredColumn = columns.map((column) => ({
    ...column,
    tasks: Array.isArray(column.tasks)
      ? column.tasks.filter((card) => {
          if (filter === "all") return card;
          return card.priority === filter;
        })
      : [],
  }));

  return (
    <>
      {filteredColumn.map((column) => {
        return <Column key={column._id} column={column} />;
      })}
    </>
  );
};

///////////// ВАРІАНТ ДЛЯ NewBoard  /////////

{
  /* <div className={css.columns_container}>
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

        
      </div> */
}
