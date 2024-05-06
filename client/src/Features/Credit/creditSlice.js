import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateCreditsApi,
  getCreditsApi,
  createCreditsApi,
} from "@/apis/credit";

export const updateCreditsAsync = createAsyncThunk(
  "credit/updateCredit",
  async ({ amoutOfCredits }, { rejectWithValue }) => {
    try {
      const response = await updateCreditsApi({ amountOfCredits });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getCreditsAsync = createAsyncThunk(
  "credit/getCredits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCreditsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  credits: 0,
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCreditsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.credits = action.payload.credits;
        }
      })
      .addCase(updateCreditsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.credits = action.payload;
        }
      });
  },
});

export const selectUserCredits = (state) => state.credit.credits;
export default creditSlice.reducer;
