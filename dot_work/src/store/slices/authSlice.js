import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, logoutUser, signIn } from "../../services";
import { toast } from "react-toastify";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials); // Automatically handles cookies
      toast.success(response.message || "Login successful");
      sessionStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      const errMsg = error?.response?.data?.error || "Login failed";
      toast.error(errMsg);
      return rejectWithValue({ error: errMsg });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (error) {
      const errMessage = error?.response?.data.error || "Unable to fetch User";
      return rejectWithValue({ error: errMessage });
    }
  }
);

export const logoutCurrentUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      sessionStorage.removeItem("user");
      return response?.message;
    } catch (error) {
      return rejectWithValue({ error: error.response?.data || error.message });
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
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
    clearAuthState(state) {
      state.user = null;
      (state.error = null), (state.loading = false);
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
      })

      // Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Unable to fetch user";
        state.user = null;
      })

      // Logout
      .addCase(logoutCurrentUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = null;
      });
  },
});

export const { setUser, logout, clearAuthError, clearAuthState } =
  authSlice.actions;

// Optional selectors for reuse
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
