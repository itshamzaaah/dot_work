export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const signUpEndPoint = `${baseUrl}/auth/signup`;
export const signInEndPoint = `${baseUrl}/auth/login`;
export const verifyOtpEndPoint = `${baseUrl}/auth/verify-otp`;
export const getAllUserEndPoint = `${baseUrl}/user/getAll`;
export const approveUserEndPoint = (userId) =>
  `${baseUrl}/user/approve/${userId}`;
