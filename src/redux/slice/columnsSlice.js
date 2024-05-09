import { createSlice } from "@reduxjs/toolkit";

import { deleteColumnAsync, editColumnAsync } from "../thunk/columnsThunk";

const columnDeleteSlice = createSlice({
  name: "columnDelete",
  initialState: {
    columns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(editColumnAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editColumnAsync.fulfilled, (state, { payload }) => {
        const index = state.columns.findIndex(column => column._id === payload._id);
        state.columns[index].title = payload.title;
        state.loading = false;
      })
      .addCase(editColumnAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setLoading } = columnDeleteSlice.actions;
export const columnsReducer = columnDeleteSlice.reducer;
