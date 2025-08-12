import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../../services";
import { toast } from "react-toastify";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials); // Automatically handles cookies
      toast.success(response.message || "Login successful");
      
      return response;
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Login failed";
      toast.error(errMsg);
      return rejectWithValue({ error: errMsg });
    }
  }
);

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong";
      });
  },
});

export const { setUser, logout, clearAuthError } = authSlice.actions;

// Optional selectors for reuse
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
