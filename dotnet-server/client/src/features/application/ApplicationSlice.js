import { createSlice } from "@reduxjs/toolkit";
import CONFIG from "../../config.json";

const initialState = {
  applications: CONFIG.applications,
  categories: CONFIG.categories,
};

export const ApplicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
});

export const selectAll = (state) => state.application.applications;

export const selectFavorites = (state) =>
  state.application.applications.filter((item) => {
    return state.user.favorites.includes(item.id);
  });

export const selectHistory = (state) => [
  // ...state.application.applications.filter((item) => {
  //   return state.user.history.includes(item.id);
  // }),
  ...state.user.history.map((id) => {
    
    const elem = state.application.applications.find((element) => element.id === id);
    return elem;
  
  })
];

export const selectByCategorie = (id) => (state) => {
  return state.application.applications.filter((item) => {
    if (item.categories.includes(id)) {
      return item;
    }
  });
};

export default ApplicationSlice.reducer;
