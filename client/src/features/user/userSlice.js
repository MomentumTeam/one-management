import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromServer } from "./userAPI";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const user = await getUserFromServer();
  return user;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    history: [],
    favorites: [],
    loading: false,
  },
  reducers: {
    AddToHistory: (state, action) => {
      state.history = [action.payload, ...state.history];
    },
    AddToFavorites: (state, action) => {
      state.favorites = [action.payload, ...state.favorites];
    },
    RemoveFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite.name !== action.payload);
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.userObj = action.payload.userObj;
      state.favorites = action.payload.favorites;
      state.history = action.payload.history;
      state.loading = false;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { AddToHistory, AddToFavorites, RemoveFromFavorites } = userSlice.actions;

// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectUser = (state) => state.user;
export const selectUserObj = (state) => state.user.userObj;
export const selectFavorites = (state) => state.user.favorites;
export const selectHistory = (state) => state.user.history;
export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
