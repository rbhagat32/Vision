import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tvShow: [],
};

export const TvReducer = createSlice({
  name: "tvShow",
  initialState,
  reducers: {
    getTvShow: (state, action) => {
      state.tvShow = action.payload;
    },
    removeTvShow: (state) => {
      state.tvShow = [];
    },
  },
});

export default TvReducer.reducer;
export const { getTvShow, removeTvShow } = TvReducer.actions;
