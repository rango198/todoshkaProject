import { createAsyncThunk } from "@reduxjs/toolkit";

import { addTask, editTask, deleteTask, moveTask } from "../../service/api";

export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async (body, thunkAPI) => {
    try {
      const response = await addTask(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTaskAsync = createAsyncThunk(
  "tasks/editTask",
  async (body, thunkAPI) => {
    try {
      const response = await editTask(body);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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

export const moveTaskAsync = createAsyncThunk(
  "tasks/moveTask",
  async (id, source, destination, thunkAPI) => {
    try {
      const response = await moveTask(id, source, destination);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
