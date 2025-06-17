import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import favoriteReducer from './favoriteSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    favorites: favoriteReducer,
  },
});