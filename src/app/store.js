import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
  devTools: !(import.meta.env.MODE === "production"),
});
export default store;
