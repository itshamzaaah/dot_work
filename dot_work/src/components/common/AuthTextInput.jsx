const AuthTextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <label className="block mb-4 text-gray-700 text-sm font-medium relative">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full border-b border-gray-300 focus:border-indigo-600 focus:outline-none py-2 placeholder-gray-400"
      />
      <div className="h-5 mt-1 transition-all duration-300 text-xs text-red-500">
        {error && <p>{error}</p>}
      </div>
    </label>
  );
};

export default AuthTextInput;
