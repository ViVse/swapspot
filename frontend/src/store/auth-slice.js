import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../utils/cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      deleteCookie("x-auth-token");
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
