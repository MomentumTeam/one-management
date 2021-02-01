import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [
    {
      name: "ניהול משתמש",
      id: "1",
      categories: ["a"],
    },
    {
      name: "BitLocker",
      id: "2",
      categories: ["b"],
    },
    {
      name: "LAPS",
      id: "3",
      categories: ["b"],
    },
    {
      name: "VLAN",
      id: "4",
      categories: ["b"],
    },
    {
      name: "Allow List",
      id: "5",
      categories: ["c"],
    },
    {
      name: "Nova",
      id: "6",
      categories: ["d"],
    },
    {
      name: "Sword",
      id: "7",
      categories: ["d"],
    },
  ],
  categories: [
    {
      name: "ניהול משתמש",
      id: "a",
    },
    {
      name: "ניהול עמדה",
      id: "b",
    },
    {
      name: "ניהול רשת",
      id: "c",
    },
    {
      name: "הרשאות ומידור",
      id: "d",
    },
    {
      name: "ניהול מייל",
      id: "e",
    },
  ],
};

export const ApplicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
});

export const selectAll = (state) => state.application.applications;

export const selectFavorite = (state) => state.application.applications.filter((item) => {
       return state.user.favorites.includes(item.id)
});

export const selectHistory = (state) => state.application.applications.filter((item) => {
    return state.user.history.includes(item.id)
});

export const selectCategories = (state) => state.application.categories;

export default ApplicationSlice.reducer;
