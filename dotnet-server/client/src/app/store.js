import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import applicationReducer from "../features/application/ApplicationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
  },
});
