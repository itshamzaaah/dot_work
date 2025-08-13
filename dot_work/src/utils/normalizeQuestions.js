export const normalizeQuestions = async (test) => {
  const all = [
    ...(test.mcqs?.map((q) => ({ ...q, type: "mcq" })) || []),
    ...(test.trueFalse?.map((q) => ({ ...q, type: "trueFalse" })) || []),
    ...(test.descriptive?.map((q) => ({ ...q, type: "descriptive" })) || []),
  ];
  return all;
};
