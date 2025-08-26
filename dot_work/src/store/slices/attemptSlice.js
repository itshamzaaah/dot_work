import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttemptDetails, getAttemptScreenshots } from "../../services";

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

export const fetchAttemptScreenshots = createAsyncThunk(
  "attemptDetails/fetchAttemptScreenshots",
  async (attemptId, { rejectWithValue }) => {
    try {
      const res = await getAttemptScreenshots(attemptId);
      return res.screenshots;
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

  screenshots: [],
  screenshotsLoading: false,
  screenshotsError: null,
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
      })

      // screenshots

      .addCase(fetchAttemptScreenshots.pending, (state) => {
        state.screenshotsLoading = true;
        state.screenshotsError = null;
        state.screenshots = [];
      })
      .addCase(fetchAttemptScreenshots.fulfilled, (state, action) => {
        state.screenshotsLoading = false;
        state.screenshots = action.payload;
      })
      .addCase(fetchAttemptScreenshots.rejected, (state, action) => {
        state.screenshotsLoading = false;
        state.screenshotsError = action.payload;
      });
  },
});

export const selectAttempt = (state) => state.attemptDetails.attempt;
export const selectLoading = (state) => state.attemptDetails.loading;
export const selectError = (state) => state.attemptDetails.error;

export const selectScreenshots = (state) => state.attemptDetails.screenshots;
export const selectScreenshotsLoading = (state) =>
  state.attemptDetails.screenshotsLoading;
export const selectScreenshotsError = (state) =>
  state.attemptDetails.screenshotsError;

export default attemptDetailsSlice.reducer;
