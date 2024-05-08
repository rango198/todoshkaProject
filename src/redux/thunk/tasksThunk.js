import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteTask } from "../../service/api";

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await deleteTask(taskId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
