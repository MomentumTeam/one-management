import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  applications: {},
  categories: {}
};


export const ApplicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {}
});

export const selectAll = (state) => state.config.config.applications;

export const selectFavorites = (state) =>
state.config.config.applications.filter((item) => {
    return state.user.favorites.includes(item.id);
  });

export const selectHistory = (state) => [
  ...state.user.history.map((id) => {

    const elem = state.config.config.applications.find((element) => element.id === id);
    return elem;

  })
];

export const selectByCategorie = (name) => (state) => {
  const categorieId=state.config.config.categories.find((categorie)=>categorie.name==name).id;

  return state.config.config.applications.filter((item) => {
    if (item.categories.includes(categorieId)) {
      return item;
    }
  });
};

export const { Init } = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
