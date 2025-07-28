import { IoChevronDown } from "react-icons/io5";

const SelectDropdown = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
  error = null,
  required,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none transition-transform duration-300 focus:rotate-180">
        <IoChevronDown size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

export default SelectDropdown;
