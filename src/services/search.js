import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
  search: "",
  path: "",
};

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, { payload }) => {
      state.search = payload;
    },
    addPath: (state, { payload }) => {
      state.path = payload;
    },
  },
});

export const { addSearch, addPath } = search.actions;
export default search.reducer;
