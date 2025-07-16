import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../store/slices/createTestSlice";

const store = configureStore({
  reducer: {
    testForm: testReducer,
  },
});

export default store;
