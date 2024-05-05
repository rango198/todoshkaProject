import { toast } from "react-toastify";

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  logout,
  login,
  register,
  currentUser,
  updateUser,
  changeTheme,
} from "../../service/api";

export const registerThunk = createAsyncThunk(
  "user/register",
  async (params, thunkAPI) => {
    try {
      const response = await register(params);
      return response;
    } catch (error) {
      toast.error(`Error during user registration: ${error.message}`);
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
      toast.error(`Incorrect email or password`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      clearAuthHeader();
      return response;
    } catch (error) {
      toast.error(`Error during user logout: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "auth/current",
  async (params, thunkAPI) => {
    try {
      const res = await currentUser(params);
      return res.params;
    } catch (error) {
      toast.error(`Error during user logout: ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/update",
  async (params, thunkAPI) => {
    try {
      const res = await updateUser(params);
      return res.params;
    } catch (error) {
      toast.error(`Failed to update user data: ${error.message}`);
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
