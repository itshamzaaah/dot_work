import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../store/slices/createTestSlice";
import authReducer from "../store/slices/authSlice";

const store = configureStore({
  reducer: {
    testForm: testReducer,
    auth: authReducer,
  },
});

export default store;
