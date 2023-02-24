import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const combinedState = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const persistConfiguration = {
  key: "user",
  whitelist: ["auth", "user"],
  storage,
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = { ...state, ...action.payload };
    return nextState;
  } else {
    return combinedState(state, action);
  }
};

const persistedReducer = persistReducer(persistConfiguration, reducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, REGISTER, REHYDRATE, PURGE, PAUSE, PERSIST],
        },
      }),
  });

  store.__persister = persistStore(store);
  return store;
};
export const wrapper = createWrapper(makeStore, { debug: true });
