import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notificationSlice from "./notification-slice";
import chatSlice from "./chat-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
