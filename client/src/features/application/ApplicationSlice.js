import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [
    {
      name: "ניהול משתמש",
      id: "1",
      type: "application",
      categories: ["a"],
    },
    {
      name: "BitLocker",
      id: "2",
      type: "application",
      categories: ["b"],
    },
    {
      name: "LAPS",
      id: "3",
      type: "application",
      categories: ["b"],
    },
    {
      name: "ניהול VLAN",
      id: "4",
      type: "application",
      categories: ["b"],
    },
    {
      name: "Allow List",
      id: "5",
      type: "application",
      categories: ["c"],
    },
    {
      name: "Nova",
      id: "6",
      type: "application",
      categories: ["d"],
    },
    {
      name: "Sword",
      id: "7",
      type: "application",
      categories: ["d"],
    },
  ],
  categories: [
    {
      name: "ניהול משתמש",
      id: "a",
      type: "category",
    },
    {
      name: "ניהול עמדה",
      id: "b",
      type: "category",
    },
    {
      name: "ניהול רשת",
      id: "c",
      type: "category",
    },
    {
      name: "הרשאות ומידור",
      id: "d",
      type: "category",
    },
    {
      name: "ניהול מייל",
      id: "e",
      type: "category",
    },
  ],
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

export const selectHistory = (state) =>
  state.application.applications.filter((item) => {
    return state.user.history.includes(item.id);
  });

export const selectCategories = (state) => state.application.categories;

export default ApplicationSlice.reducer;
