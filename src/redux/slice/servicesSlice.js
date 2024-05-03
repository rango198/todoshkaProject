import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  addTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  getTaskThunk,
} from "../thunk/servicesThunk";

const initialState = {
  task: [],
  error: null,
  isLoading: false,
  openModal: false,
  modalContent: {
    endPoint: null,
    action: null,
    recordDataEdit: null,
    recordDataAdd: null,
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
      .addMatcher(
        isAnyOf(
          getTaskThunk.pending,
          addTaskThunk.pending,
          editTaskThunk.pending,
          deleteTaskThunk.pending
        ),
        (state) => {
          state.error = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getTaskThunk.fulfilled,
          addTaskThunk.fulfilled,
          editTaskThunk.fulfilled,
          deleteTaskThunk.fulfilled
        ),
        (state, action) => {
          state.error = null;
          state.isLoading = false;

          state.task = action.payload.task;
        }
      )
      .addMatcher(
        isAnyOf(
          getTaskThunk.rejected,
          addTaskThunk.rejected,
          editTaskThunk.rejected,
          deleteTaskThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setModalStatus, setModalContent } = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
