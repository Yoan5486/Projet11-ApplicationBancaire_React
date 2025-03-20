import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./composants/auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;