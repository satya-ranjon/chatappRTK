import { configureStore } from "@reduxjs/toolkit";

export default store = configureStore({
  reducer: {},
  middleware: (defaultMiddleware) => defaultMiddleware(),
  devTools: !import.meta.env.MODE === "production",
});
