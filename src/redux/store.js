import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./slice/authSlice";
import serviceReducer from "./slice/servicesSlice";
import filterReducer from "./slice/filterSlice";
// import boardsReducer from "./boards/slice";
// import { tasksReducer } from "./slice/tasksSlice";
// import { columnsReducer } from "./slice/columnsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    service: persistReducer(persistConfig, serviceReducer),
    filter: persistReducer(persistConfig, filterReducer),
    // boards: persistReducer(persistConfig, boardsReducer),
    // tasks: persistReducer(persistConfig, tasksReducer),
    // columns: persistReducer(persistConfig, columnsReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
