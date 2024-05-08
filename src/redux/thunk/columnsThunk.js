import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteColumn } from "../../service/api";

export const deleteColumnAsync = createAsyncThunk(
  "columns/deleteColumn",
  async (columnId, thunkAPI) => {
    try {
      const response = await deleteColumn(columnId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
