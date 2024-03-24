import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../rtk/Slices/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
