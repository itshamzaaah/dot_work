import { useState } from "react";
import loginImg from "../assets/images/signup.png";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Api call 🥲
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="flex max-w-5xl w-full rounded-3xl shadow-lg overflow-hidden">
        {/* Left Part */}
        <div className="flex flex-col bg-indigo-400 px-12 py-10 w-6/12 rounded-l-3xl text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">DotWork</span>
            </div>
            <p className="text-xs font-light mb-8">Study Online, Learn Online</p>
            <h1 className="text-3xl font-extrabold leading-tight mb-10">
              AI Based <br />
              Evaluation <br />
              of the assessments
            </h1>
          </div>
          <div className="w-60  flex items-center justify-center mx-auto">
            <img
              src={loginImg}
              alt="Illustration"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              // className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right Part */}
        <div className="w-9/12 bg-indigo-400">
          <div className="bg-white p-10 rounded-3xl shadow-md relative shadow-2xl">
<div className="block h-3 mb-4 text-gray-700 text-sm font-medium">
              </div>
            <h2 className="text-2xl font-semibold mb-8">Welcome Back</h2>

            <form onSubmit={handleSubmit}>
              
              {/* Email */}
              <label className="block mb-4 text-gray-700 text-sm font-medium">
                Email Address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="mt-1 block w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 placeholder-gray-400"
                  required
                />
              </label>
              <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500"></div>
              {/* Password */}
              <label className="block mb-4 text-gray-700 text-sm font-medium relative">
                Password
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-1 block w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-0 bottom-3 pr-2 text-gray-400 hover:text-indigo-600 focus:outline-none"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {/* SVG same as before */}
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.975 9.975 0 012.052-6.086M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </label>
              <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500"></div>
              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember Me
                </label>
                <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
              </div>
              <div className="block h-3 mb-4 text-gray-700 text-sm font-medium">
              </div>
                <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500"></div>
              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-full text-white font-semibold transition duration-200 ${isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"
                  } transition duration-200`}
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center mt-8 mb-6 text-gray-300 text-sm">
              <div className="bg-gray-200 flex-1 h-px"></div>
              <span className="mx-4">Or Sign Up With</span>
              <div className="bg-gray-200 flex-1 h-px"></div>
            </div>

            <div className="flex justify-center space-x-6 text-gray-500">
              {/* Use below SVG icons or image URLs for social icons */}
              <a href="#" aria-label="Google" className="hover:text-indigo-600">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285f4"
                    d="M533.5 278.4c0-18.6-1.5-37-4.2-54.6H272v103.6h146.9c-6.4 34.6-25.8 63.9-55 83.3v68h88.7c51.9-47.9 81.9-118.2 81.9-200.3z"
                  />
                  <path
                    fill="#34a853"
                    d="M272 544.3c74.5 0 137-24.5 182.6-66.3l-88.7-68c-24.7 16.6-56.2 26.3-93.9 26.3-72 0-133.1-48.6-155-113.8H27v71.5c44.9 88.4 137.1 150.3 245 150.3z"
                  />
                  <path
                    fill="#fbbc04"
                    d="M117 324.5c-11.8-34.6-11.8-71.9 0-106.5V146H27c-39.6 77.1-39.6 169.1 0 246.2l90-67.7z"
                  />
                  <path
                    fill="#ea4335"
                    d="M272 107.7c39.9 0 75.8 13.7 104.2 40.7l78.1-78.1C408.8 24.5 346.3 0 272 0 164.1 0 71.9 61.9 27 150.3l90 68c21.7-65.2 83-113.8 155-113.8z"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-indigo-600">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0h-21.35c-.735 0-1.325.589-1.325 1.324v21.352c0 .734.59 1.324 1.324 1.324h11.494v-9.294H9.691v-3.622h3.008V8.413c0-2.978 1.917-4.6 4.72-4.6 1.343 0 2.498.1 2.835.144v3.292l-1.947.001c-1.527 0-1.823.726-1.823 1.792v2.35h3.646l-.475 3.622h-3.171V24h6.215c.736 0 1.326-.59 1.326-1.324V1.325c0-.735-.59-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-indigo-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 11-4.3-4.31 4 4 0 014.3 4.31z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-indigo-600">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.164-2.724c-.949.564-2.002.974-3.127 1.195A4.918 4.918 0 0016.616 3a4.92 4.92 0 00-4.917 4.917c0 .385.045.76.127 1.121C7.728 8.806 4.1 6.864 1.671 3.905a4.822 4.822 0 00-.666 2.475 4.917 4.917 0 002.188 4.096 4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.922 4.922 0 004.6 3.417 9.868 9.868 0 01-6.102 2.104c-.396 0-.788-.023-1.174-.067a13.945 13.945 0 007.557 2.212c9.054 0 14.002-7.498 14.002-14 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.476-2.252-1.666-2.252-0.909 0-1.452.61-1.691 1.2-.087.211-.108.506-.108.802v5.854h-3v-10h3v1.367c.398-.614 1.109-1.485 2.695-1.485 1.965 0 3.438 1.282 3.438 4.043v5.075z" />
                </svg>
              </a>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/')}
                className="text-indigo-600 underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
