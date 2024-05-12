import { createAsyncThunk } from "@reduxjs/toolkit";
import { addColumn, deleteColumn, editColumn } from "../../service/api";

export const deleteColumnAsync = createAsyncThunk(
  "columns/deleteColumn",
  async (columnId, thunkAPI) => {
    try {
      await deleteColumn(columnId);
      return columnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editColumnAsync = createAsyncThunk(
  "columns/editColumn",
  async ( body, thunkAPI) => {
    try {
      const response = await editColumn(body);
      return response;
    } catch (error) {
      // toast.error("Error edit", error);


      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addColumnAsync = createAsyncThunk(
  "service/addColumn",
  async (data, thunkAPI) => {
    try {
      const response = await addColumn(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
