import { createSlice } from "@reduxjs/toolkit";

import {
  addBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  fetchSingleBoard,
  getBoardThunk,
} from "../thunk/servicesThunk";

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

      //   .addCase(fetchSingleBoard.fulfilled, (state, action) => {
      //     state.error = null;
      //     state.isLoading = false;
      //     if (action.payload.columns[0].hasOwnProperty("_id")) {
      //       state.selectedBoard = action.payload;
      //       return;
      //     }
      //     state.selectedBoard = action.payload;
      //     state.selectedBoard.columns = [];
      //   })

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
        state.error = null;
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
      });
  },
});

export const { setModalStatus, setModalContent, addColumnSuccess } =
  serviceSlice.actions;
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
