import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addBoard,
  deleteBoard,
  editBoard,
  getAllBoards,
  getSingleBoard,
  updateUser,
} from "../../service/api";

// export const fetchAllBoards = createAsyncThunk(
//   "boards/getAll",
//   async (_, thunkAPI) => {
//     try {
//       const res = await getBoards();
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const createBoard = createAsyncThunk(
//   "boards/create",
//   async (data, thunkAPI) => {
//     try {
//       await addBoard(data);
//       return;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const getBoardThunk = createAsyncThunk(
  "service/getBoard",
  async (_, thunkAPI) => {
    try {
      const response = await getAllBoards();
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
      const response = await addBoard(body);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Error add", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchSingleBoard = createAsyncThunk(
  "service/singleBoard",
  async (id, thunkAPI) => {
    try {
      const data = await getSingleBoard(id);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoardThunk = createAsyncThunk(
  "service/editBoard",
  async (body, thunkAPI) => {
    try {
      // const [id, board] = body;
      const data = await editBoard(body);
      return data;
    } catch (error) {
      toast.error("Error edit", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ${body.id}`, body)

export const deleteBoardThunk = createAsyncThunk(
  "service/deleteBoard",
  async (id, thunkAPI) => {
    try {
      await deleteBoard(id);
      return id;
    } catch (error) {
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
