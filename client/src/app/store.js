import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice";
import applicationReducer from "../features/application/ApplicationSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    application:applicationReducer
  },
});
