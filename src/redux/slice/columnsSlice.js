import { createSlice } from "@reduxjs/toolkit";

import { deleteColumnAsync } from "../thunk/columnsThunk";

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
      });
  },
});

export const columnsReducer = columnDeleteSlice.reducer;
