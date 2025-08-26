export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const signUpEndPoint = `${baseUrl}/auth/signup`;
export const signInEndPoint = `${baseUrl}/auth/login`;
export const verifyOtpEndPoint = `${baseUrl}/auth/verify-otp`;
export const getAllUserEndPoint = `${baseUrl}/user/getAll`;
export const approveUserEndPoint = (userId) =>
  `${baseUrl}/user/approve/${userId}`;
export const createTestEndPoint = `${baseUrl}/test/create`;
export const getAllTestsEndPoint = `${baseUrl}/test/getAll`;
export const getMyTestsEndPoint = `${baseUrl}/test/my-tests`;
export const addCandidatesEndPoint = (testId) =>
  `${baseUrl}/test/add-candidates/${testId}`;
export const testDetailsEndPoint = (testId) => `${baseUrl}/test/${testId}`;
export const getCurrentUserEndPoint = `${baseUrl}/auth/me`;
export const logoutEndPoint = `${baseUrl}/auth/logout`;
export const getTestEndPoint = (slug) => `${baseUrl}/test/slug/${slug}`;
export const submitTestEndPoint = `${baseUrl}/test/submit`;
export const getAllAttemptsEndPoint = `${baseUrl}/attempt/getAll`;
export const attemptDetailsEndPoint = (attemptId) => `${baseUrl}/attempt/${attemptId}`;
export const getMyAttemptsEndPoint = `${baseUrl}/attempt/mine`;
export const uploadScreenShotEndPoint = `${baseUrl}/proctoring/upload-screenshot`;
export const getScreenshotsEndPoint = (attemptId) => `${baseUrl}/proctoring/${attemptId}`;