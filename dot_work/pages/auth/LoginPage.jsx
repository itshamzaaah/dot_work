import { useEffect, useState } from "react";
import loginImg from "../../src/assets/images/signup.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../../src/store/slices/authSlice";
import AuthLayout from "../../src/layouts/AuthLayout";
import AuthTextInput from "../../src/components/common/AuthTextInput";
import AuthPasswordInput from "../../src/components/common/AuthPasswordInput";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (user) {
      navigate(user?.role === "CANDIDATE" ? "/my-tests" : "/dashboard");
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

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-full text-white font-semibold transition duration-200 ${
            isValid
              ? "bg-primary hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          } transition duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
