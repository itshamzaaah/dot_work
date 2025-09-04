import axios from "axios";
import {
  addCandidatesEndPoint,
  approveUserEndPoint,
  attemptDetailsEndPoint,
  createTestEndPoint,
  getAllAttemptsEndPoint,
  getAllTestsEndPoint,
  getAllUserEndPoint,
  getCurrentUserEndPoint,
  getMyAttemptsEndPoint,
  getMyTestsEndPoint,
  getScreenshotsEndPoint,
  getTestEndPoint,
  logoutEndPoint,
  signInEndPoint,
  signUpEndPoint,
  submitTestEndPoint,
  testDetailsEndPoint,
  updatedAttemptDetailsEndPoint,
  uploadScreenShotEndPoint,
  verifyOtpEndPoint,
} from "./config";
import api from "../utils/api";

export const post = async (endPoint, data = {}) => {
  try {
    const response = await api.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("Error making post request:", error);
    throw error;
  }
};

export const get = async (endPoint, params = {}) => {
  try {
    const response = await api.get(endPoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetch data", error);
    throw error;
  }
};

export const patch = async (endPoint, data) => {
  try {
    const response = await api.patch(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("Error fetch data", error);
    throw error;
  }
};

export async function signUp(data) {
  const result = await post(signUpEndPoint, data);
  return result;
}

export async function verifyOtp(data) {
  const result = await post(verifyOtpEndPoint, data);
  return result;
}

export async function signIn(data) {
  const result = await post(signInEndPoint, data);
  return result;
}

export async function getAllUsers(params = {}) {
  const result = await get(getAllUserEndPoint, params);
  return result;
}

export async function approveUser({ userId, email, role }) {
  const result = await patch(approveUserEndPoint(userId), { email, role });
  return result;
}

export async function createTest(data) {
  const result = await post(createTestEndPoint, data);
  return result;
}

export async function getAllTests(data) {
  const result = await get(getAllTestsEndPoint, data);
  return result;
}

export async function addCandidates({ testId, data }) {
  const result = await patch(addCandidatesEndPoint(testId), data);
  return result;
}
export async function getTestDetails(testId) {
  const result = await get(testDetailsEndPoint(testId));
  return result;
}
export async function getMyTests() {
  const result = await get(getMyTestsEndPoint);
  return result;
}

export async function getCurrentUser() {
  const result = await get(getCurrentUserEndPoint);
  return result;
}
export async function logoutUser() {
  const result = await post(logoutEndPoint);
  return result;
}

export async function getTestBySlug(slug) {
  const result = await get(getTestEndPoint(slug));
  return result;
}

export async function submitTest(data) {
  const result = await post(submitTestEndPoint, data);
  return result;
}

export async function getAllAttemptsByRole(role, params = {}) {
  const endpoint = role === "CANDIDATE" ? getMyAttemptsEndPoint : getAllAttemptsEndPoint;
  const result = await get(endpoint, params);
  return result;
}

export async function getAttemptDetails(attemptId) {
  const result = await get(attemptDetailsEndPoint(attemptId));
  return result;
}

export async function uploadScreenshot(data) {
  const result = await post(uploadScreenShotEndPoint, data);
  return result;
}

export async function getAttemptScreenshots(attemptId) {
  const result = await get(getScreenshotsEndPoint(attemptId));
  return result;
}

export async function updatedAttemptDetails(attemptId, data) {
  const result = await patch(updatedAttemptDetailsEndPoint(attemptId), data);
  return result;
}