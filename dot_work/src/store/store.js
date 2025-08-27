import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../store/slices/createTestSlice";
import authReducer from "../store/slices/authSlice";
import attemptDetailsReducer from "../store/slices/attemptSlice";
import uiReducer from "../store/slices/uiSlice";

const store = configureStore({
  reducer: {
    testForm: testReducer,
    auth: authReducer,
    attemptDetails: attemptDetailsReducer,
    ui: uiReducer,
  },
});

export default store;
