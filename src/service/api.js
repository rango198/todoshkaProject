import axios from "axios";

const BASE_URL = "https://todoshka-back-5xf7.onrender.com/api/";

const $instance = axios.create({ baseURL: BASE_URL });

export const setAccessToken = (token) => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAccessToken = () => {
  $instance.defaults.headers.common.Authorization = "";
};

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

export const currentUser = async (params) => {
  const { data } = await $instance.get("users/current", params);
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;
  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  setAccessToken(persistedToken);
  return data;
};

export const updateUser = async (formData) => {
  const { data } = await $instance.put("users/update", formData);
  return data;
};

export const changeTheme = async (params) => {
  const { data } = await $instance.patch("users/theme", params);

  return data;
};

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
  const { data } = await $instance.patch(`boards/${body.id}`, body);
  return data;
};

export const deleteBoard = async (id) => {
  const { data } = await $instance.delete(`boards/${id}`);
  return data;
};

export const sendHelp = async (formData) => {
  const { data } = await $instance.post("users/help", formData);
  return data;
};
export const deleteColumn = async (id) => {
  const { data } = await $instance.delete(`columns/${id}`);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await $instance.delete(`tasks/${id}`);
  return data;
};
