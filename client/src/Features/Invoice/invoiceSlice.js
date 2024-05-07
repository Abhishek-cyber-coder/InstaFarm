import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addInvoiceApi,
  fetchInvoicesApi,
  fetchInvoiceByIdApi,
} from "../../apis/invoice";

export const addInvoiceAsync = createAsyncThunk(
  "invoice/addInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await addInvoiceApi(invoiceData);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchInvoicesAsync = createAsyncThunk(
  "invoice/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchInvoicesApi();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchInvoiceByIdAsync = createAsyncThunk(
  "invoice/fetchInvoiceById",
  async (invoiceId, rejectWithValue) => {
    try {
      const response = await fetchInvoiceByIdApi(invoiceId);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  allInvoices: [],
  selectedInvoice: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addInvoiceAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.allInvoices.push(action.payload.newInvoice);
        }
      })
      .addCase(fetchInvoicesAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.allInvoices = action.payload;
        }
      })
      .addCase(fetchInvoiceByIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedInvoice = action.payload.invoiceDetail;
        }
      });
  },
});

export const selectAllInvoices = (state) => state.invoice.allInvoices;
export const selectSelectedInvoice = (state) => state.invoice.selectedInvoice;

export default invoiceSlice.reducer;
