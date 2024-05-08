import { createSlice } from "@reduxjs/toolkit";

import { deleteTaskAsync } from "../thunk/tasksThunk";

const taskDeleteSlice = createSlice({
  name: "taskDelete",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = taskDeleteSlice.reducer;
