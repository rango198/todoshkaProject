import { createSlice } from "@reduxjs/toolkit";
import { editProfile } from "../thunk/reduxThunk";
const initialState = {
  user: { name: "", email: "", avatar: "", id: "" },
  token: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.email = action.payload.data.user.email;
        state.user.avatar = action.payload.data.user.avatarUrl;
        state.user.id = action.payload.data.user._id;
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;
