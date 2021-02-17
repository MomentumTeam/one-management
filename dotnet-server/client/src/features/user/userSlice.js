import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromServer, updateUserInServer } from "./userAPI";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const user = await getUserFromServer();
  return user;
});

export const updateFavorites = createAsyncThunk("user/updateFavorites", async (_, { getState }) => {
  try {
    const { favorites } = getState().user;
    const user = await updateUserInServer({ Favorites: favorites });
    return user;
  }
  catch (e) {
    throw e;
  }
});

export const updateHistory = createAsyncThunk("user/updateHistory", async (_, { getState }) => {
  try {
    const { history } = getState().user;
    const user = await updateUserInServer({ History: history });
    return user;
  }
  catch (e) {
    throw e;
  }
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
      state.history = state.history.filter((item) => item !== action.payload);
      state.history = [action.payload, ...state.history];
      state.history = state.history.slice(0, Math.min(3, state.history.length));
    },
    AddToFavorites: (state, action) => {
      state.favorites = [action.payload, ...state.favorites];
    },
    RemoveFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite !== action.payload);
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
    [getUser.rejected]: (state, action) => {
    }
  }
});

export const { AddToHistory, AddToFavorites, RemoveFromFavorites } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserObj = (state) => state.user.userObj;
export const selectFavorites = (state) => state.user.favorites;
export const selectHistory = (state) => state.user.history;
export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
