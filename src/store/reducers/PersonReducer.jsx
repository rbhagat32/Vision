import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person: [],
};

export const PersonReducer = createSlice({
  name: "person",
  initialState,
  reducers: {
    getPerson: (state, action) => {
      state.person = action.payload;
    },
    removePerson: (state) => {
      state.person = [];
    },
  },
});

export default PersonReducer.reducer;
export const { getPerson, removePerson } = PersonReducer.actions;
