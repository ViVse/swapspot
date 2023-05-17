import axios from "../config/axios";
import { notificationActions } from "./notification-slice";
import { getCookie } from "../utils/cookie";

export const fetchNotifications = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/notifications", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(
        notificationActions.setNotifications({
          notifications: res.data.notifications,
          newCount: res.data.new,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const createNotification = (socket, user, title, text, link) => {
  return async () => {
    const res = await axios.post(
      "api/notifications",
      {
        user,
        title,
        text,
        link,
      },
      {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      }
    );
    socket.emit("sendNotification", res.data);
  };
};

// sets all notifications as read
export const readNotifications = () => {
  return async (dispatch) => {
    try {
      await axios.patch("api/notifications/read", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(notificationActions.setAllRead());
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteNotification = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/notifications/${id}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(notificationActions.delete(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAll = () => {
  return async (dispatch) => {
    try {
      await axios.delete("api/notifications/all", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(
        notificationActions.setNotifications({
          notifications: [],
          newCount: 0,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
};
