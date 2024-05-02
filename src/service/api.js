import axios from "axios";

const $instance = axios.create({ baseURL: BASE_URL });

export const setToken = (token) => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearToken = () => {
//   $instance.defaults.headers.common.Authorization = "";
// };

export const signUp = async ({ endPoint, params }) => {
  const { data } = await $instance.post(endPoint, params);
  setToken(data.token);
  return data;
};

export const signIn = async ({ endPoint, params }) => {
  const { data } = await $instance.post(endPoint, params);
  setToken(data.token);
  return data;
};

export const logout = async ({ endPoint }) => {
  const { data } = await $instance.post(endPoint);
  return data;
};

// ====================== info_query

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
