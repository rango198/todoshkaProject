import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  logout,
  login,
  register,
  currentUser,
  updateUser,
  changeTheme,
  sendHelp,
} from "../../service/api";

export const registerThunk = createAsyncThunk(
  "user/register",
  async (params, thunkAPI) => {
    try {
      const response = await register(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (params, thunkAPI) => {
    try {
      const response = await login(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const res = await currentUser(auth.token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const data = await updateUser(userData.formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeThemeThunk = createAsyncThunk(
  "auth/theme",
  async (data, thunkAPI) => {
    try {
      const res = await changeTheme(data);
      return res.data.theme;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendHelpThunk = createAsyncThunk(
  "auth/needHelp",
  async (data, thunkAPI) => {
    try {
      const res = await sendHelp(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
