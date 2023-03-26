import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import conversationReducer from "../features/conversations/conversationSlice";
import messagesReducer from "../features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    conversations: conversationReducer,
    messages: messagesReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),

  devTools: !(import.meta.env.MODE === "production"),
});

export default store;
