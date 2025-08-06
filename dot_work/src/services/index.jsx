import axios from "axios";
import {
  approveUserEndPoint,
  getAllUserEndPoint,
  signInEndPoint,
  signUpEndPoint,
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

export const get = async (endPoint) => {
  try {
    const response = await api.get(endPoint);
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

export async function getAllUsers(data) {
  const result = await get(getAllUserEndPoint, data);
  return result;
}

export async function approveUser({ userId, email, role }) {
  const result = await patch(approveUserEndPoint(userId), { email, role });
  return result;
}
