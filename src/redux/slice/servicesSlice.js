import { createSlice } from "@reduxjs/toolkit";

import {
  addBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  getBoardThunk,
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
      // /////////////PENDING////////////
      .addCase(getBoardThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addBoardThunk.pending, (state) => {
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
        state.isLoading = false;
        state.task = action.payload.task;
      })
      .addCase(addBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.task = action.payload.task;
      })
      .addCase(editBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.task = action.payload.task;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.task = action.payload.task;
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
      .addCase(editBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBoardThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setModalStatus, setModalContent } = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
