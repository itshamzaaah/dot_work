import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUpImg from "../assets/images/signup.png";
import { signUp } from "../services";
import { toast } from "react-toastify";
import AuthLayout from "../layouts/AuthLayout";
import AuthTextInput from "./common/AuthTextInput";
import AuthPasswordInput from "./common/AuthPasswordInput";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const isNameValid =
    /^[A-Za-z\s]*$/.test(formData.name) && formData.name.trim() !== "";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(formData.password);

  const canSubmit =
    formData.agreed && isNameValid && isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      const response = await signUp(formData);
      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/verify-otp", {
            state: { name: formData.name, email: formData.email },
          });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data.error);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      imgSrc={signUpImg}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkOnClick={() => navigate("/login")}
    >
      <form onSubmit={handleSubmit}>
        <AuthTextInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Full Name"
          required
          error={touched.name && !isNameValid ? "Full name must contain only alphabets and spaces." : ""}
        />

        <AuthTextInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email Address"
          required
          error={touched.email && !isEmailValid ? "Enter a valid email address (e.g. user@example.com)." : ""}
        />

        <AuthPasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          required
          error={
            touched.password && !isPasswordValid
              ? "Password must be at least 6 characters, include 1 capital letter and 1 special character."
              : ""
          }
        />

        <label className="flex items-center text-xs text-gray-600 mb-8">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            className="mr-2 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            required
          />
          I agree to the{" "}
          <a
            href="#"
            className="text-indigo-600 underline mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-indigo-600 underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
          .
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-3 rounded-full text-white font-semibold ${
            canSubmit
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-300 cursor-not-allowed"
          } transition duration-200`}
        >
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
