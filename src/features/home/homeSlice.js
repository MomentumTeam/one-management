import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    page: "favorites",
  },
  reducers: {
    switchTo: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { switchTo } = homeSlice.actions;

// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectHome = (state) => state.home;

export default homeSlice.reducer;
