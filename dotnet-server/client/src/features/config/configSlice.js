import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apis from "../../api/applicationsApi";

const Config = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/clientConfig/config.json`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const getConfig = createAsyncThunk("config/getConfig", async () => {
  try {
    const config = await Config();
    return config;
  }
  catch (error) {
    throw error;
  }
});

export const getAllFaq = createAsyncThunk("config/getQ", async () => {
  try {
    const faq = await apis.getFaq();
    return faq;
  }
  catch (error) {
    throw error;
  }
});

export const configSlice = createSlice({
  name: "config",
  initialState: {
    config: {},
    faq: []
  },
  reducers: {
    AddToFAQ: (state, action) => {
      state.faq = [...state.faq, action.payload];
    },
    RemoveFromFAQ: (state, action) => {
      state.faq = state.faq.filter((question) =>
        question.id !== action.payload.id
      );
    },
  },

  extraReducers: {
    [getConfig.fulfilled]: (state, action) => {
      state.config = action.payload;
    },
    [getConfig.rejected]: (state, action) => {
      console.log("Could not get the config file from the server");
    },

    [getAllFaq.fulfilled]: (state, action) => {
      state.faq = action.payload;
    },
    [getAllFaq.rejected]: (state, action) => {
      console.log("Could not get FAQ");
    }
  }
});

export const { AddToFAQ, RemoveFromFAQ } = configSlice.actions;

export const selectConfig = (state) => state.config.config;
export const selectFAQ = (state) => state.config.faq;

export default configSlice.reducer;
