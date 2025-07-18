
export const validateStepOne = (data) => {
  const errors = {};

  if (!data.testName?.trim()) {
    errors.testName = "Test Name is required";
  }

  if (!data.category?.trim()) {
    errors.category = "Category is required";
  }

  const duration = Number(data.duration);
  if (!duration || duration <= 0) {
    errors.duration = "Duration must be a positive number";
  }

  if (!data.description?.trim() || data.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
};



export const validateStepTwo = ({ mcqs, trueFalse, descriptive }) => {
  const errors = {
    mcqs: [],
    trueFalse: [],
    descriptive: [],
  };

  let hasError = false;

  // Validate MCQs
  mcqs.forEach((mcq, index) => {
    const questionErrors = {};
    if (!mcq.question?.trim()) {
      questionErrors.question = "Question is required";
    }
    if (!mcq.correctAnswer?.trim()) {
      questionErrors.correctAnswer = "Correct answer is required";
    }
    if (!Array.isArray(mcq.options) || mcq.options.length < 2) {
      questionErrors.options = "At least 2 options are required";
    } else {
      mcq.options.forEach((opt, i) => {
        if (!opt?.trim()) {
          questionErrors[`option${i}`] = `Option ${i + 1} is required`;
        }
      });
    }
    if (!mcq.marks || mcq.marks <= 0) {
      questionErrors.marks = "Marks must be a positive number";
    }

    if (Object.keys(questionErrors).length > 0) {
      hasError = true;
    }

    errors.mcqs[index] = questionErrors;
  });

  // Validate True/False
  trueFalse.forEach((q, index) => {
    const questionErrors = {};
    if (!q.question?.trim()) {
      questionErrors.question = "Question is required";
    }
    if (!q.correctAnswer?.trim()) {
      questionErrors.correctAnswer = "Correct answer is required";
    }
    if (!q.marks || q.marks <= 0) {
      questionErrors.marks = "Marks must be a positive number";
    }

    if (Object.keys(questionErrors).length > 0) {
      hasError = true;
    }

    errors.trueFalse[index] = questionErrors;
  });

  // Validate Descriptive
  descriptive.forEach((q, index) => {
    const questionErrors = {};
    if (!q.question?.trim()) {
      questionErrors.question = "Question is required";
    }
    if (!q.marks || q.marks <= 0) {
      questionErrors.marks = "Marks must be a positive number";
    }

    if (Object.keys(questionErrors).length > 0) {
      hasError = true;
    }

    errors.descriptive[index] = questionErrors;
  });

  return {
    success: !hasError,
    errors,
  };
};


export const validateStepThree = (data) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.candidateEmails.length) {
    errors.candidateEmails = "At least one email is required";
  } else {
    const invalids = data.candidateEmails.filter(
      (email) => !emailRegex.test(email)
    );
    if (invalids.length) {
      errors.candidateEmails = `Invalid email(s): ${invalids.join(", ")}`;
    }
  }

  if (!data.accessDeadline?.trim()) {
    errors.accessDeadline = "Access deadline is required";
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
};


// get status color

export const getStatusBadge = (status) => {
  const base = "px-3 py-0.5 text-xs font-semibold rounded-full capitalize";
  if (status === "graded") return `${base} bg-green-700 text-white`;
  if (status === "pending") return `${base} bg-yellow-700 text-white`;
  return base;
};