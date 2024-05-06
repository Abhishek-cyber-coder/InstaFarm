import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  deleteCartItemsApi,
  getCartDetailsApi,
  updateCartApi,
} from "../../apis/cart";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartApi({ productId, quantity });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getCartDetailsAsync = createAsyncThunk(
  "cart/getCartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartDetailsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartApi({ productId, quantity });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteCartItemsAsync = createAsyncThunk(
  "cart/deleteCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteCartItemsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartDetail: null,
    addToCartClicked: 1,
  },
  reducers: {
    addedToCart(state) {
      state.addToCartClicked += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state) => {
        return state;
      })
      .addCase(getCartDetailsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartDetail = action.payload;
        }
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartDetail = action.payload;
        }
      })
      .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartDetail = action.payload;
        }
      });
  },
});

export const selectCartDetail = (state) => state.cart.cartDetail;
export const selectIsAddCart = (state) => state.cart.addToCartClicked;

export const { addedToCart } = cartSlice.actions;

export default cartSlice.reducer;
