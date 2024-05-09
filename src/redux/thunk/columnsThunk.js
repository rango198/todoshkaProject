import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteColumn, editColumn } from "../../service/api";

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

export const editColumnAsync = createAsyncThunk(
  "columns/editColumn",
  async ({columnId, body}, thunkAPI) => {
    try {
      const response = await editColumn(columnId, body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
