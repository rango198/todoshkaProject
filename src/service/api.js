import axios from "axios";

const BASE_URL = "https://todoshka-back-5xf7.onrender.com/api/";

const $instance = axios.create({ baseURL: BASE_URL });

export const setAccessToken = (token) => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAccessToken = () => {
  $instance.defaults.headers.common.Authorization = "";
};

// =================AUTH=========================
export const register = async (params) => {
  const { data } = await $instance.post("users/register", params);
  setAccessToken(data.accessToken);
  return data;
};

export const login = async (params) => {
  const { data } = await $instance.post("users/login", params);
  setAccessToken(data.accessToken);
  return data;
};

export const logout = async () => {
  const { data } = await $instance.post("users/logout");

  clearAccessToken();
  return data;
};

export const currentUser = async (token) => {
  setAccessToken(token);
  try {
    const { data } = await $instance.get("users/current");
    return data;
  } catch (error) {
    setAccessToken();
    throw error;
  }
};

export const updateUser = async (formData) => {
  const { data } = await $instance.put("users/update", formData);
  return data;
};
// =================THEME=========================
export const changeTheme = async (params) => {
  const { data } = await $instance.patch("users/theme", params);

  return data;
};
// =================BOARDS=========================
export const getAllBoards = async () => {
  const { data } = await $instance.get("boards");
  return data;
};

export const addBoard = async (body) => {
  const { data } = await $instance.post("boards", body);
  return data;
};

export const getSingleBoard = async (id) => {
  const { data } = await $instance.get(`boards/${id}`);
  return data;
};

export const editBoard = async (body) => {
  const [id, board] = body;
  const { data } = await $instance.put(`boards/${id}`, { ...board });
  return data;
};

export const deleteBoard = async (id) => {
  const { data } = await $instance.delete(`boards/${id}`);
  return data;
};
// ==================HELP========================
export const sendHelp = async (formData) => {
  const { data } = await $instance.post("users/help", formData);
  return data;
};
// ==================COLUMNS=====================
export const addColumn = async ({ title, boardId }) => {
  if (!title || !boardId) {
    throw new Error("Title and Board ID are required to create a column");
  }
  try {
    const body = {
      title: title,
      board: boardId,
    };
    const { data } = await $instance.post("columns", body);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

export const deleteColumn = async (id) => {
  const { data } = await $instance.delete(`columns/${id}`);
  return data;
};

export const editColumn = async (body) => {
  const [id, column] = body;
  const { data } = await $instance.put(`columns/${id}`, column);
  return data;
};
// =================TASKS======================
export const addTask = async (body) => {
  const { data } = await $instance.post("tasks", body);
  return data;
};

export const editTask = async (body) => {
  const { newTask } = body;
  const { data } = await $instance.put(`tasks/${body._id}`, newTask);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await $instance.delete(`tasks/${id}`);
  return data;
};

export const moveTask = async (
  sourceColumnId,
  destinationColumnId,
  taskId,
  accessToken
) => {
  try {
    const { data } = await $instance.patch(
      `tasks/${taskId}/transfer`,
      {
        source: {
          index: 1,
          transferId: sourceColumnId,
        },
        destination: {
          index: 1,
          transferId: destinationColumnId,
        },
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error moving task:", error);
    throw error;
  }
};
