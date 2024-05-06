import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivateFormData } from "../../service/api";

export const editProfile = createAsyncThunk(
  "auth/profile",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axiosPrivateFormData.put(
        `/api/users/current/${userData.userId}`,
        userData.formData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);
//Это функция для EditProfile (Таня) не удалять!!!
