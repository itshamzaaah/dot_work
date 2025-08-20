import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../store/slices/createTestSlice";
import authReducer from "../store/slices/authSlice";
import attemptDetailsReducer from "../store/slices/attemptSlice";

const store = configureStore({
  reducer: {
    testForm: testReducer,
    auth: authReducer,
    attemptDetails: attemptDetailsReducer,
  },
});

export default store;
