import { useState } from "react";
import loginImg from "../assets/images/signup.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../services";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      const response = await signIn({ email, password });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="flex flex-col md:flex-row max-w-5xl w-full rounded-3xl shadow-lg overflow-hidden">
        {/* Left Part */}
        <div className="flex flex-col bg-indigo-400 px-4 py-3 md:px-12 md:py-10 w-full md:w-6/12 md:rounded-l-3xl text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">DotWork</span>
            </div>
            <p className="text-xs font-light mb-8">
              Study Online, Learn Online
            </p>
            <h1 className="text-xl md:text-3xl font-extrabold leading-tight mb-0 md:mb-10">
              AI Based <br />
              Evaluation <br />
              of the assessments
            </h1>
          </div>
          <div className="hidden md:block w-60 flex items-center justify-center mx-auto">
            <img
              src={loginImg}
              alt="Illustration"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>

        {/* Right Part */}
        <div className="w-full md:w-9/12 bg-indigo-400">
          <div className="bg-white p-4 md:p-10 rounded-3xl shadow-md relative h-full">
            <div className="block h-3 mb-4 text-gray-700 text-sm font-medium"></div>
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
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {/* SVG same as before */}
                  {passwordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.975 9.975 0 012.052-6.086M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </label>
              <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500"></div>
              <div className="block h-3 mb-4 text-gray-700 text-sm font-medium"></div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-full text-white font-semibold transition duration-200 ${
                  isValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                } transition duration-200`}
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/")}
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
