import { createSlice } from "@reduxjs/toolkit";

import {
  deleteColumnAsync,
  editColumnAsync,
  addColumnAsync,
} from "../thunk/columnsThunk";

const columnDeleteSlice = createSlice({
  name: "columnDelete",
  initialState: {
    columns: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      //deleteColumn
      .addCase(deleteColumnAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColumnAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteColumnAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //editColumn
      .addCase(editColumnAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editColumnAsync.fulfilled, (state, { payload }) => {
        const index = state.columns.findIndex(
          (column) => column._id === payload._id
        );
        state.columns[index].title = payload.title;
        state.loading = false;
      })
      .addCase(editColumnAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //addColumn
      .addCase(addColumnAsync.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addColumnAsync.fulfilled, (state, action) => {
        state.columns.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addColumnAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading } = columnDeleteSlice.actions;
export const columnsReducer = columnDeleteSlice.reducer;
