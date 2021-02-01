import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import applicationReducer from "../features/application/ApplicationSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    application:applicationReducer,
    user: userReducer,
  },
});
