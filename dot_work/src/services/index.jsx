import axios from "axios";
import { signInEndPoint, signUpEndPoint, verifyOtpEndPoint } from "./config";

export const post = async (endPoint, data = {}) => {
  try {
    const response = await axios.post(endPoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error making post request:", error);
    throw error;
  }
};

export const get = async (endPoint, token) => {
  try {
    const response = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetch data", data);
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
