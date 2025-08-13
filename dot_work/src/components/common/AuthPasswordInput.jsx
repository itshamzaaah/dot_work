import { useState } from "react";

const AuthPasswordInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block mb-4 text-gray-700 text-sm font-medium relative">
      {label}
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 placeholder-gray-400"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="absolute right-0 bottom-8 pr-2 text-gray-400 hover:text-indigo-600 focus:outline-none"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          /* eye-off SVG */
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
          </svg>
        ) : (
          /* eye SVG */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
      <div className="h-5 mt-1 text-xs text-red-500">{error && <p>{error}</p>}</div>
    </label>
  );
};

export default AuthPasswordInput;
