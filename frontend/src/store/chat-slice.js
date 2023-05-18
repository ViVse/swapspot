import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    // messages of selected conversation
    messages: [],
    unreadCount: 0,
  },
  reducers: {
    // action.payload: conversations
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    // action.payload: unreadCount
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    // action.payload: messages
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
