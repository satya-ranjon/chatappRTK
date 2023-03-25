import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export default apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_TITLE }),
  endpoints: (builder) => ({}),
});
