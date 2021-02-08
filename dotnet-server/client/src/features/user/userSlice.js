import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromServer, updateUserInServer } from "./userAPI";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const user = await getUserFromServer();
  return user;
});

export const updateFavorites = createAsyncThunk("user/updateFavorites", async (_, { getState }) => {
  const { favorites } = getState().user;
  console.log("updateFavorites: favorites:", favorites);
  const user = await updateUserInServer({ Favorites: favorites });
  return user;
});

export const updateHistory = createAsyncThunk("user/updateHistory", async (_, { getState }) => {
  const { history } = getState().user;
  const user = await updateUserInServer({ History: history });
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
      console.log("state.history before=",state.history);
      state.history = state.history.filter((item) => item !== action.payload);
      state.history = [action.payload, ...state.history];
      state.history = state.history.slice(0, Math.min(3, state.history.length));
      console.log("state.history after=",state.history);
      console.log("AddToHistory:", state.history);
    },
    AddToFavorites: (state, action) => {
      console.log("state.favorites before:", state.favorites);
      state.favorites = [action.payload, ...state.favorites];
      console.log("state.favorites after:", state.favorites);
    },
    RemoveFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite !== action.payload);
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      console.log("getUser Fulfilled!");
      console.log(action.payload);
      state.userObj = action.payload.userObj;
      state.favorites = action.payload.favorites;
      state.history = action.payload.history;
      state.loading = false;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.rejected]: (state, action) => {
      console.log("getUser rejected!");
      console.log(action.error);
    },
    [updateFavorites.fulfilled]: (state, action) => {
      console.log("updateFavorites Fulfilled!");
      console.log(action.payload);
      state.favorites = action.payload.favorites;
    },
    [updateHistory.fulfilled]: (state, action) => {
      console.log("updateHistory Fulfilled!");
      console.log(action.payload);
      state.history = action.payload.history;
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
