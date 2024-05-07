import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "all",
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
const filterReducer = filterSlice.reducer;
export default filterReducer;
