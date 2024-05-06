import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsApi } from "@/apis/product";

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProductsApi();

      return response;
    } catch (error) {
      return rejectWithValue("Error fetching products");
    }
  }
);

const initialState = {
  isLoading: false,
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.products?.splice(0);
          state.products.push(...action.payload.products);
        }
      })
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
