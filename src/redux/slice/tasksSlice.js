import { createSlice } from "@reduxjs/toolkit";

import {
  addTaskAsync,
  editTaskAsync,
  deleteTaskAsync,
  moveTaskAsync,
} from "../thunk/tasksThunk";

const initialState = {
  tasks: [],
  board: null,
  loading: false,
  error: null,
  openModal: false,
  modalContent: {
    endPoint: null,
    action: null,
    recordDataEdit: null,
    recordDataAdd: null,
    editedData: null,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
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
      //-----------Pending--------------
      .addCase(addTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(moveTaskAsync.pending, (state) => {
        state.loading = true;
      })
      //--------------Fulfilled-------------------
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.tasks.push(action.payload);
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null;
        state.tasks = action.payload.tasks;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = action.payload.tasks;
      })
      .addCase(moveTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.board = action.payload.board;
      })
      //-------------Rejected-------------
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(moveTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
