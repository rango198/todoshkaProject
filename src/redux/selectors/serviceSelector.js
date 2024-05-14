export const selectOpenModal = (state) => state.service.openModal;
export const selectModalContent = (state) => state.service.modalContent;

export const selectAllBoards = (state) => state.service.boards;
export const selectedBoard = (state) => state.service.selectedBoard;
export const selectIsBoardsLoading = (state) => state.service.isLoading;
export const getFilter = (state) => state.filter;

export const selectedColumn = (state) => state.service.selectedBoard.columns;
export const selectedTask = (state) =>
  state.service.selectedBoard.columns.tasks;
