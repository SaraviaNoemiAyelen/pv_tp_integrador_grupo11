import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const productToAdd = action.payload;

      if (!state.items.some(item => item.id === productToAdd.id)) {
        state.items.push(productToAdd);
      }
    },

    removeFavorite: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== productIdToRemove);
    },
    
    setFavorites: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;