import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
    // action.payload - new user
    login(state, action) {
      state.user = action.payload;
    },
    // action.payload - favorites array
    setFavorites(state, action) {
      if (!state.user) return;

      state.user.favorites = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
