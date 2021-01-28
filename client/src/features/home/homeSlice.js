import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    page: "favorites",
    tab:0
  },
  reducers: {
    switchTo: (state, action) => {
      state.page = action.payload;
    },
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { switchTo,changeTab } = homeSlice.actions;

// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectHome = (state) => state.home;
export const selectTab = (state) => state.home.tab;

export default homeSlice.reducer;
