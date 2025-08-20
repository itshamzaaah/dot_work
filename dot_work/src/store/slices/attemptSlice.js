import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttemptDetails } from "../../services";

export const fetchAttemptDetails = createAsyncThunk(
  "attemptDetails/fetchAttemptDetails",
  async (attemptId, { rejectWithValue }) => {
    try {
      const response = await getAttemptDetails(attemptId);
      return response.attempt;
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message;
      return rejectWithValue(errMsg);
    }
  }
);

const initialState = {
  attempt: null,
  loading: false,
  error: null,
};

const attemptDetailsSlice = createSlice({
  name: "attemptDetails",
  initialState,
  reducers: {
    resetAttemptDetails: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAttemptDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttemptDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.attempt = action.payload;
      })
      .addCase(fetchAttemptDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAttempt = (state) => state.attemptDetails.attempt;
export const selectLoading = (state) => state.attemptDetails.loading;
export const selectError = (state) => state.attemptDetails.error;

export default attemptDetailsSlice.reducer;