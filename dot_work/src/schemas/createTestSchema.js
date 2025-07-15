// src/schemas/testValidation.js
import { z } from 'zod';

// Step One Schema
export const stepOneSchema = z.object({
  testName: z
    .string()
    .min(1, "Test name is required")
    .min(3, "Test name must be at least 3 characters")
    .max(100, "Test name must be less than 100 characters"),
  
  category: z
    .string()
    .min(1, "Category is required"),
  
  duration: z
    .string()
    .min(1, "Duration is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Duration must be a positive number"
    )
    .transform((val) => Number(val))
    .refine(
      (val) => val >= 5 && val <= 480,
      "Duration must be between 5 and 480 minutes"
    ),
  
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
});

// Step Two Schema (Questions)
const mcqSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  marks: z.number().min(1, "Marks must be at least 1")
});

const trueFalseSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Question is required"),
  correctAnswer: z.boolean(),
  marks: z.number().min(1, "Marks must be at least 1")
});

const descriptiveSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Question is required"),
  marks: z.number().min(1, "Marks must be at least 1"),
  timeLimit: z.number().optional()
});

export const stepTwoSchema = z.object({
  mcqs: z.array(mcqSchema),
  trueFalse: z.array(trueFalseSchema),
  descriptive: z.array(descriptiveSchema)
}).refine(
  (data) => data.mcqs.length + data.trueFalse.length + data.descriptive.length > 0,
  {
    message: "At least one question is required",
    path: ["questions"]
  }
);

// Step Three Schema (Sharing)
export const stepThreeSchema = z.object({
  candidateEmails: z
    .array(z.string().email("Invalid email format"))
    .min(1, "At least one candidate email is required"),
  
  accessDeadline: z
    .string()
    .min(1, "Access deadline is required")
    .refine(
      (val) => new Date(val) > new Date(),
      "Access deadline must be in the future"
    ),
  
  testLink: z.string().url("Invalid URL format")
});

// Step Four Schema (Proctoring)
export const stepFourSchema = z.object({
  enableProctoring: z.boolean(),
  screenShotFrequency: z.string().min(1, "Screenshot frequency is required"),
  forceFullScreen: z.boolean()
});

// Complete form schema
export const completeFormSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
  stepFour: stepFourSchema
});

// Individual step validation functions
export const validateStepOne = (data) => {
  try {
    const result = stepOneSchema.parse(data);
    return { success: true, data: result, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, data: null, errors };
  }
};

export const validateStepTwo = (data) => {
  try {
    const result = stepTwoSchema.parse(data);
    return { success: true, data: result, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path.join('.')] = err.message;
    });
    return { success: false, data: null, errors };
  }
};

export const validateStepThree = (data) => {
  try {
    const result = stepThreeSchema.parse(data);
    return { success: true, data: result, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, data: null, errors };
  }
};

export const validateStepFour = (data) => {
  try {
    const result = stepFourSchema.parse(data);
    return { success: true, data: result, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, data: null, errors };
  }
};

export const validateCompleteForm = (data) => {
  try {
    const result = completeFormSchema.parse(data);
    return { success: true, data: result, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path.join('.')] = err.message;
    });
    return { success: false, data: null, errors };
  }
};