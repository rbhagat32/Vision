import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: [],
};

export const MovieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovie: (state, action) => {
      state.movie = action.payload;
    },
    removeMovie: (state) => {
      state.movie = [];
    },
  },
});

export default MovieReducer.reducer;
export const { getMovie, removeMovie } = MovieReducer.actions;
