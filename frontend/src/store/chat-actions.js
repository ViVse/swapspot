import axios from "../config/axios";
import { getCookie } from "../utils/cookie";
import { chatActions } from "./chat-slice";

export const fetchUnreadCount = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/chat/conversations/unread", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(chatActions.setUnreadCount(res.data.unreadCount));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchConversations = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/chat/conversations", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(chatActions.setConversations(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};
