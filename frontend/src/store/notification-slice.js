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
    setAllRead(state) {
      state.notifications.forEach((n) => n.read === true);
      state.newCount = 0;
    },
    //action.payload = notificationId
    delete(state, action) {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
