import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    try{
        const config = await Config();
        return config;
    }
    catch(error){
        throw error;
    }
  });

  
export const configSlice = createSlice({
  name: "config",
  initialState: {config: {applications : [] , catrgories: []}
  },
  extraReducers: {
    [getConfig.fulfilled]: (state, action) => {
      state.config = action.payload;
    },
    [getConfig.rejected]: (state, action) => {
        console.log("Could not get the config file from the server");
    }
  }
});

export const selectConfig = (state) => state.config.config;

export default configSlice.reducer;
