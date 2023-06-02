import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    selectedConversation: "",
    // messages of selected conversation
    messages: [],
    members: [],
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
    // action.payload: number to modify by
    addUnread(state, action) {
      state.unreadCount += action.payload;
    },
    // action.payload: messages
    setMessages(state, action) {
      state.messages = action.payload;
    },
    // action.pauload: message
    addMessage(state, action) {
      if (action.payload.conversation !== state.selectedConversation) {
        state.unreadCount++;
        return;
      }
      state.messages.push(action.payload);
    },
    // action.payload: conversationId
    selectConversation(state, action) {
      state.selectedConversation = action.payload._id;
      state.messages = action.payload.messages;
      state.members = action.payload.members;
    },
    exitChat(state) {
      state.selectedConversation = "";
      state.members = [];
      state.messages = [];
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
