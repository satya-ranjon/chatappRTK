import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLogout());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;
