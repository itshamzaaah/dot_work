import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  stepOne: {
    testName: "",
    category: "",
    duration: "60",
    description: "",
  },

  stepTwo: {
    mcqs: [],
    trueFalse: [],
    descriptive: [],
  },
  stepThree: {
    candidateEmails: [],
    accessDeadline: "",
    testLink: "https://assessai.pro/test/abcl123xyz",
  },
  stepFour: {
    enableProctoring: true,
    screenShotFrequency: 5,
    forceFullScreen: true,
  },
};

const creatTestSlice = createSlice({
  name: "testSlice",
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    updateStepOne(state, action) {
      state.stepOne = { ...state.stepOne, ...action.payload };
    },
    setMcqs(state, action) {
      state.stepTwo.mcqs = action.payload;
    },
    setTrueFalse(state, action) {
      state.stepTwo.trueFalse = action.payload;
    },
    setDescriptive(state, action) {
      state.stepTwo.descriptive = action.payload;
    },

    updateStepThree(state, action) {
      state.stepThree = { ...state.stepThree, ...action.payload };
    },

    updateStepFour(state, action) {
      state.stepFour = { ...state.stepFour, ...action.payload };
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  updateStepOne,
  setMcqs,
  setTrueFalse,
  setDescriptive,
  updateStepThree,
  updateStepFour,
  resetForm,
  setCurrentStep
} = creatTestSlice.actions;

export default creatTestSlice.reducer;
