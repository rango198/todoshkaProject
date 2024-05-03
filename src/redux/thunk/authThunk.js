import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logout, signIn, signUp } from "../../service/api";

export const signUpThunk = createAsyncThunk(
  "user/register",
  async ({ endPoint, params }, thunkAPI) => {
    try {
      const response = await signUp(endPoint, params);
      return response;
    } catch (error) {
      toast.error(`Error during user registration: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signInThunk = createAsyncThunk(
  "user/login",
  async ({ endPoint, params }, thunkAPI) => {
    try {
      const response = await signIn(endPoint, params);
      return response;
    } catch (error) {
      toast.error(`Incorrect email or password`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async ({ endPoint, params }, thunkAPI) => {
    try {
      const response = await logout(endPoint, params);
      return response;
    } catch (error) {
      toast.error(`Error during user logout: ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
