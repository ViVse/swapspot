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

export const fetchChatData = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/chat/conversation/${id}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });
      dispatch(chatActions.selectConversation(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendMessage = (conversationId, text, to, socket) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `/api/chat/message`,
        { text, conversation: conversationId },
        {
          headers: {
            "x-auth-token": getCookie("x-auth-token"),
          },
        }
      );
      const message = { ...res.data, conversation: conversationId };
      dispatch(chatActions.addMessage(message));
      socket.emit("sendMessage", { to, message: message });
    } catch (e) {
      console.log(e);
    }
  };
};
