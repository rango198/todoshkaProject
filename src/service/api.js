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
  // setToken(data.token);
  return data;
};

export const login = async (params) => {
  const { data } = await $instance.post("users/login", params);
  setAccessToken(res.data.accessToken);
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

export const updateUser = async (params) => {
  const { data } = await $instance.put("users/update", params);
  return data;
};

export const changeTheme = async (params) => {
  const { data } = await $instance.patch("users/theme", params);
  clearAccessToken();
  return data;
};

//============================================================

export const getData = async ({ endPoint, getParams }) => {
  const { data } = await $instance.get(endPoint, {
    params: {
      ...getParams,
    },
  });
  return data;
};

export const addData = async ({ endPoint, postData, postParams }) => {
  const { data } = await $instance.post(endPoint, postData, {
    params: {
      ...postParams,
    },
  });
  return data;
};

export const editData = async ({ endPoint, putData, editParams }) => {
  const { data } = await $instance.patch(endPoint, putData, {
    params: {
      ...editParams,
    },
  });
  return data;
};

export const deleteData = async ({ endPoint, deleteParams }) => {
  const { data } = await $instance.delete(endPoint, {
    params: {
      ...deleteParams,
    },
  });
  return data;
};
