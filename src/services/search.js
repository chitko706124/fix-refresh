import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import Cookies from "js-cookie";

const initialState = {
  search: "",
  path: "",
  user: [],
  cartItems: []
};

const STORE_KEY = "cartItems";
const storeItems = Cookies.get(STORE_KEY);

if (storeItems) {
  initialState.cartItems = JSON.parse(storeItems);
}

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
    addUser : (state,{payload})=> {
      state.user = payload
    },
    addToCart: (state, { payload }) => {
      state.cartItems = [...state.cartItems, ...payload];
      Cookies.set(STORE_KEY, JSON.stringify(state.cartItems));
    },
  },
});

export const { addSearch, addPath, addToCart ,addUser} = search.actions;
export default search.reducer;
