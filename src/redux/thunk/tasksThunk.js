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
  async ({ sourceColumnId, destinationColumnId, taskId, accessToken }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}/transfer`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            source: {
              index: 1,
              transferId: sourceColumnId,
            },
            destination: {
              index: 1,
              transferId: destinationColumnId,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to move task");
      }

      // Верните здесь данные, которые вы хотите сохранить в состоянии Redux
      // Например, если вам нужно обновить информацию о задаче после ее перемещения
      return { taskId, sourceColumnId, destinationColumnId };
    } catch (error) {
      console.error("Error moving task:", error);
      throw error;
    }
  }
);

export const moveTssdskAsync = createAsyncThunk(
  "tasks/moveTask",
  async ({ sourceColumnId, destinationColumnId, taskId, accessToken }) => {
    try {
      await moveTask(sourceColumnId, destinationColumnId, taskId, accessToken);

      return { taskId, sourceColumnId, destinationColumnId };
    } catch (error) {
      console.error("Error moving task:", error);
      throw error;
    }
  }
);
