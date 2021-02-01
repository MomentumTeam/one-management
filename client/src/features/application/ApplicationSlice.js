import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "hiii",
        id: 1,
        category: ["net"]
    },
    {
        name: "sfasda",
        id: 2,
        category: ["user"]
    },
    {
        name: "hihhrhtergii",
        id: 3,
        category: ["net"]
    }
]

export const ApplicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
    },
});

// export const { } = homeSlice.actions;

export const selectAll = (state) => state.application

export const selectFavorite = (state) => state.application.filter((item) => {
    return item.id === 2
});

export const selectHistory = (state) => state.application.filter((item) => {
    return item.id === 1
});

export default ApplicationSlice.reducer;
