import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "Candidate";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full text-center space-y-6" style={{ padding: "20px" }}>
        <FaCheckCircle className="text-green-600 block mx-auto" size={30} />

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Thank You!</h1>
        {name && <p className="text-lg text-blue-600 font-semibold">{name}!</p>}

        {/* Message */}
        <p className="text-gray-600 text-sm">
          Your email has been verified successfully. Awaiting admin approval.
        </p>

        {/* Return to Login */}
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-indigo-700 transition-all"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
