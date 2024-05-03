import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addData, deleteData, editData, getData } from "../../service/api";

export const getTaskThunk = createAsyncThunk(
  "task/getTask",
  async ({ endPoint, getParams }, thunkAPI) => {
    try {
      const response = await getData({ endPoint, getParams });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(`Error get ${endPoint} : `, error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "task/addTask",
  async ({ endPoint, postData, postParams }, thunkAPI) => {
    try {
      const response = await addData({ endPoint, postData, postParams });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(`Error add ${endPoint} : `, error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTaskThunk = createAsyncThunk(
  "task/editTask",
  async ({ endPoint, putData, editParams }, thunkAPI) => {
    try {
      const response = await editData({ endPoint, putData, editParams });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(`Error edit ${endPoint} : `, error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "task/deleteTask",
  async ({ endPoint, deleteParams }, thunkAPI) => {
    try {
      const response = await deleteData({ endPoint, deleteParams });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(`Error delete ${endPoint} : `, error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
