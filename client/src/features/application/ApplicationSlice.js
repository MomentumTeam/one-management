import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applications: [
        {
            name: "UserManagement",
            displayName: "ניהול משתמש",
            id: "1",
            type: "application",
            categories: ["a"],
        },
        {
            name: "BitLocker",
            displayName: "Bit Locker",
            id: "2",
            type: "application",
            categories: ["b"],
        },
        {
            name: "LAPS",
            displayName: "LAPS",
            id: "3",
            type: "application",
            categories: ["b"],
        },
        {
            name: "VLAN",
            displayName: "VLAN",
            id: "4",
            type: "application",
            categories: ["b"],
        },
        {
            name: "AllowList",
            displayName: "Allow List",
            id: "5",
            type: "application",
            categories: ["c"],
        },
        {
            name: "Nova",
            displayName: "Nova",
            id: "6",
            type: "application",
            categories: ["d"],
        },
        {
            name: "Sword",
            displayName: "Sword",
            id: "7",
            type: "application",
            categories: ["d"],
        },
    ],
    categories: [
        {
            displayName: "ניהול משתמש",
            id: "a",
            type: "category",
        },
        {
            displayName: "ניהול עמדה",
            id: "b",
            type: "category",
        },
        {
            displayName: "ניהול רשת",
            id: "c",
            type: "category",
        },
        {
            displayName: "הרשאות ומידור",
            id: "d",
            type: "category",
        },
        {
            displayName: "ניהול מייל",
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
