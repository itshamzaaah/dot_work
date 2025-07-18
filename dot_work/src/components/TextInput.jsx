const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error = null,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
      />
    </div>
  );
};

export default TextInput;
