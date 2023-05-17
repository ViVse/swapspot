import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    newCount: 0,
  },
  reducers: {
    // action.payload: {notificatoins, newCount}
    setNotifications(state, action) {
      state.notifications = action.payload.notifications;
      state.newCount = action.payload.newCount;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
