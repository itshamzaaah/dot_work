import { useEffect, useState } from "react";
import loginImg from "../assets/images/signup.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../store/slices/authSlice";
import AuthLayout from "../layouts/AuthLayout";
import AuthTextInput from "./common/AuthTextInput";
import AuthPasswordInput from "./common/AuthPasswordInput";

const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <AuthLayout
      title="Welcome Back"
      imgSrc={loginImg}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkOnClick={() => navigate("/")}
    >
      <form onSubmit={handleSubmit}>
        <AuthTextInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500"></div>
        {/* Password */}
        <AuthPasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
