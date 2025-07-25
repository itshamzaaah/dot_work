const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error = null,
  min=null
}) => {
  const handleChange = (e) => {
    if (name) {
      onChange(name, e.target.value);
    } else {
      onChange(e);
    }
  };

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
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
      />
    </div>
  );
};

export default TextInput;
