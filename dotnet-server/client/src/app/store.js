import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import configReducer from "../features/config/configSlice";
import applicationReducer from "../features/application/ApplicationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    config: configReducer
  },
});
