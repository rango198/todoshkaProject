import { createSlice } from "@reduxjs/toolkit";
import {
  logoutThunk,
  loginThunk,
  registerThunk,
  currentUserThunk,
  updateUserThunk,
  changeThemeThunk,
} from "../thunk/authThunk";

const initialState = {
  user: { name: "", email: "", avatar: "", id: "", theme: "" },
  token: "",
  isLogin: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLogin = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //login
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLogin = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //logout
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = "";
        state.isLogin = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // Сurrunet user (refresh)
      .addCase(currentUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(currentUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.token = "";
      })
      //Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        console.log("action.payload:", action.payload);
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatarUrl;
        state.user.id = action.payload._id;
        state.isLoading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //Theme change
      .addCase(changeThemeThunk.fulfilled, (state, action) => {
        state.user.theme = action.payload; // theme is a property of user
      })
      .addCase(changeThemeThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
const authReducer = authSlice.reducer;
export default authReducer;
