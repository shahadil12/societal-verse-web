import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  // preloadedState: {
  //   aut
  // },
});

export default store;
