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

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  filter: filterReducer,
  // boards: boardsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
