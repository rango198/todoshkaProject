import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addData, deleteData, editData, getData } from "../../service/api";

export const getBoardThunk = createAsyncThunk(
  "service/getBoard",
  async (_, thunkAPI) => {
    try {
      const response = await getData();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error get ", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoardThunk = createAsyncThunk(
  "service/addBoard",
  async (body, thunkAPI) => {
    try {
      const response = await addData(body);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error add", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoardThunk = createAsyncThunk(
  "service/editBoard",
  async (body, thunkAPI) => {
    try {
      const response = await editData(body);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error edit ", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  "service/deleteBoard",
  async (id, thunkAPI) => {
    try {
      const response = await deleteData(id);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error delete", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
