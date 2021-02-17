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
  ...state.user.history.map((id) => {

    const elem = state.application.applications.find((element) => element.id === id);
    return elem;

  })
];

export const selectByCategorie = (name) => (state) => {
  const categorieId=CONFIG.categories.find((categorie)=>categorie.name==name).id;

  return state.application.applications.filter((item) => {
    if (item.categories.includes(categorieId)) {
      return item;
    }
  });
};

export default ApplicationSlice.reducer;
