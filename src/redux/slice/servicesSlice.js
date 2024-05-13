import { createSlice } from "@reduxjs/toolkit";

import {
  addBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  fetchSingleBoard,
  getBoardThunk,
} from "../thunk/servicesThunk";
import {
  addColumnAsync,
  deleteColumnAsync,
  editColumnAsync,
} from "../thunk/columnsThunk";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  moveTaskAsync,
} from "../thunk/tasksThunk";

const initialState = {
  boards: [],
  selectedBoard: {},
  error: null,
  isLoading: false,
  openModal: false,
  modalContent: {
    endPoint: null,
    action: null,
    recordDataEdit: null,
    AddId: null,
    editedData: null,
  },
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setModalStatus: (state, action) => {
      state.openModal = action.payload;
    },
    setModalContent: (state, action) => {
      state.modalContent = { ...state.modalContent, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // /////////////PENDING////////////
      .addCase(getBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchSingleBoard.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(editBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      // //////////FULFILD///////////////////
      .addCase(getBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.boards = [...action.payload];
        state.isLoading = false;
      })
      .addCase(addBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.boards.push(action.payload);
      })
      .addCase(fetchSingleBoard.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        if (
          action.payload.columns &&
          action.payload.columns[0] &&
          action.payload.columns[0].hasOwnProperty("_id")
        ) {
          state.selectedBoard = action.payload;
        } else {
          state.selectedBoard = action.payload;
          state.selectedBoard.columns = [];
        }
      })
      .addCase(editBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBoard.title = action.payload.title;
        state.selectedBoard.icon = action.payload.icon;
        state.selectedBoard.background = action.payload.background;
        const idx = state.boards.findIndex(
          (el) => el._id === action.payload._id
        );
        state.boards[idx] = action.payload;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.boards.findIndex((el) => el._id === action.payload);
        state.boards.splice(idx, 1);
        if (state.selectedBoard._id === action.payload) {
          state.selectedBoard = {};
        }
      })
      // /////////////////REJECTED/////////////////
      .addCase(getBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // =====================COLUMN============================
      .addCase(deleteColumnAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumnAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.selectedBoard.columns.findIndex(
          (el) => el._id === action.payload
        );
        if (idx === -1) {
          return state;
        }
        state.selectedBoard.columns.splice(idx, 1);
      })
      .addCase(deleteColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //===================EDIT-COLUMN==========================
      .addCase(editColumnAsync.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(editColumnAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id, title } = action.payload;
        const columnIndex = state.selectedBoard.columns.findIndex(
          (el) => el._id === _id
        );
        if (columnIndex !== -1) {
          state.selectedBoard.columns[columnIndex].title = title;
        }
      })
      .addCase(editColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //=======================ADD-COLUMN========================
      .addCase(addColumnAsync.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addColumnAsync.fulfilled, (state, action) => {
        state.selectedBoard.columns.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addColumnAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // /////////////Tasks////////////
      //----------------------------Pending--------------------
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(moveTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      //--------------Fulfilled-------------------
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const task = action.payload;
        const columnIndex = state.selectedBoard.columns.findIndex(
          (column) => column._id === task.column
        );
        if (columnIndex !== -1) {
          state.selectedBoard.columns[columnIndex].tasks.push(task);
        } else {
          state.error = "Column not found";
        }
      })

      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.error = null;
        const editTask = action.payload;
        const idxColumn = state.selectedBoard.columns.findIndex(
          (column) => column._id === editTask.column
        );
        if (idxColumn !== -1) {
          const idxTask = state.selectedBoard.columns[
            idxColumn
          ].tasks.findIndex((task) => task._id === editTask._id);
          if (idxTask !== -1) {
            state.selectedBoard.columns[idxColumn].tasks[idxTask] =
              action.payload;
          }
        }
      })

      // {
      //     "_id": "66423134382481f110046ec4",
      //     "title": "zagolovokTest2",
      //     "description": "Desk",
      //     "priority": "Without",
      //     "deadline": "2024-05-14T15:26:20.000Z",
      //     "owner": "66412c2ebc935ea4ce9ce354",
      //     "column": "66423111382481f110046eb6"
      // }

      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id, column_id } = action.payload;
        const idx = state.selectedBoard.columns.findIndex(
          (column) => column._id === column_id
        );
        if (idx !== -1) {
          const column = state.selectedBoard.columns[idx];
          const taskIndex = column.tasks.findIndex((task) => task._id === _id);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
          }
        }
      })

      // ====================================================================================
      .addCase(moveTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { taskId, sourceColumnId, destinationColumnId } = action.payload;
        const sourceColumnIndex = state.boards.findIndex(
          (column) => column._id === sourceColumnId
        );
        const destinationColumnIndex = state.boards.findIndex(
          (column) => column._id === destinationColumnId
        );
        if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
          const taskIndexInSourceColumn = state.boards[
            sourceColumnIndex
          ].tasks.findIndex((task) => task._id === taskId);
          if (taskIndexInSourceColumn !== -1) {
            const movedTask = state.boards[sourceColumnIndex].tasks.splice(
              taskIndexInSourceColumn,
              1
            )[0];
            state.boards[destinationColumnIndex].tasks.push(movedTask);
          }
        }
      })

      //-------------Rejected-------------
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(moveTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setModalStatus, setModalContent, addColumnSuccess } =
  serviceSlice.actions;
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
