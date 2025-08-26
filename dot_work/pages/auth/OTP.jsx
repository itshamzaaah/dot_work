import { useState, useRef, useEffect } from "react";
import { verifyOtp } from "../../src/services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const { name, email } = location.state;

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Only digits

    const newOtp = [...otp];

    // Handle single digit input
    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if available
      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
    // Handle multiple digits (paste scenario)
    else if (value.length > 1) {
      const digits = value.split("").slice(0, 6 - index);
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        newOtp[index + i] = digits[i];
      }
      setOtp(newOtp);

      // Focus next empty input or last input
      const nextIndex = Math.min(index + digits.length, 5);
      if (inputsRef.current[nextIndex]) {
        inputsRef.current[nextIndex].focus();
      }
    }
    // Handle empty value (deletion)
    else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current field if it has value
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
      }
    }
    // Handle delete key
    else if (e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
    // Handle Enter key
    else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleFocus = (e) => {
    e.target.select(); // Select all text when focused
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (pasteData) {
      const pasteArray = pasteData.split("");
      const newOtp = [...otp];

      // Fill from the current focused input or from start
      const startIndex = 0;
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasteArray[i] || "";
      }

      setOtp(newOtp);

      // Focus the next empty input or the last filled input
      const nextFocusIndex = Math.min(pasteArray.length, 5);
      if (inputsRef.current[nextFocusIndex]) {
        inputsRef.current[nextFocusIndex].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      try {
        const response = await verifyOtp({ email, otp: enteredOtp });
        if (response.status === 200) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/thank-you", { state: { name } });
          }, 1000);
        }
      } catch (error) {
        toast.error(error.message || "Failed to verify OTP");
      }
    } else {
      alert("Please enter complete 6-digit OTP");
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            OTP Verification
          </h2>
          <p className="text-gray-500 text-sm">
            Enter the 6-digit code sent to your email/phone
          </p>
        </div>

        {/* OTP Input Fields */}
        <div
          className="flex justify-center gap-2 md:gap-3 mb-8"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
              className={`w-10 !h-14 text-center p-24 text-xl md:text-2xl font-semibold border-2 rounded-xl transition-all duration-200 ${
                digit
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 bg-white text-gray-700"
              } focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 hover:border-indigo-400`}
              autoComplete="off"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-3 md:py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
            isComplete
              ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isComplete ? "Verify OTP" : "Enter Complete OTP"}
        </button>
        {/* Help Text */}
        <div className="mt-4 text-xs text-gray-400">
          <p>• Use arrow keys to navigate</p>
          <p>• Press Enter to verify</p>
          <p>• Paste 6-digit code directly</p>
        </div>
      </div>
    </div>
  );
};

export default OTP;
