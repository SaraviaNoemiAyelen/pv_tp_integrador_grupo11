import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar productos"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.data.push(newProduct);
      if (!newProduct.rating) {
        newProduct.rating = { rate: 0, count: 0 };
      }
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.data.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedProduct };
      }
      const favIndex = state.favorites.findIndex((fav) => fav.id === id);
      if (favIndex !== -1) {
        state.favorites[favIndex] = {
          ...state.favorites[favIndex],
          ...updatedProduct,
        };
      }
    },
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload;
      state.data = state.data.filter(
        (product) => product.id !== productIdToDelete
      );
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== productIdToDelete
      );
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === productId);

      if (isFavorite) {
        state.favorites = state.favorites.filter((fav) => fav.id !== productId);
      } else {
        const productToAdd = state.data.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          state.favorites.push(productToAdd);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addProduct, editProduct, deleteProduct, toggleFavorite } =
  productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.data;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductById = (state, productId) =>
  state.products.data.find((product) => product.id === productId);