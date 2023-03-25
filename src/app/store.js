import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";

export default store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
  devTools: !import.meta.env.MODE === "production",
});
