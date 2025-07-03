import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import favoritesReducer from "./favoriteSlice";
import useReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    user: useReducer,
  },
});

export default store;