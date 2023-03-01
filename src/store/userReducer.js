import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  followers: 0,
  following: 0,
  profile: {},
  sessionId: "",
  messages: [],
  receiverSocketId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setProfile(state, action) {
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.profile = action.payload.profile;
    },
    setSessionId(state, action) {
      state.sessionId = action.payload;
    },
    setMessages(state, action) {
      state.messages.push(action.payload);
    },
    setReceiverSocketId(state, action) {
      state.receiverSocketId = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
