import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "@/apis/auth";

const updateLocalStorage = (state) => {
  if (state.name) {
    localStorage.setItem("name", state.name);
  }

  if (state.isAuthenticated) {
    localStorage.setItem("isAuthenticated", state.isAuthenticated);
  }

  if (state.token) {
    localStorage.setItem("token", state.token);
  }
};

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      debugger;
      return response;
    } catch (error) {
      debugger;
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(userData);

      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  isLoading: false,
  token: null,
  name: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.name = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;

          state.name = action.payload.username;

          state.token = action.payload.token;
          updateLocalStorage(state);
        }
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.name = action.payload.username;
          state.token = action.payload.token;
          updateLocalStorage(state);
        }
      });
  },
});

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
