export const prepareTestPayload = (formState) => {
  return {
    testName: formState.stepOne.testName,
    category: formState.stepOne.category,
    duration: parseInt(formState.stepOne.duration),
    description: formState.stepOne.description,
    mcqs: formState.stepTwo.mcqs.map(({ question, options, marks }) => ({
      question,
      options,
      marks
    })),
    trueFalse: formState.stepTwo.trueFalse.map(({ question, marks }) => ({
      question,
      marks
    })),
    descriptive: formState.stepTwo.descriptive.map(({ question, marks }) => ({
      question,
      marks
    })),
    accessDeadline: new Date().toISOString(), // Replace with actual deadline if needed
    enableProctoring: formState.stepFour.enableProctoring,
    screenShotFrequency: formState.stepFour.screenShotFrequency,
    fullScreenForce: formState.stepFour.forceFullScreen
  };
};
