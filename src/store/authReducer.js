import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: "", mode: "light" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
