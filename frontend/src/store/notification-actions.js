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
