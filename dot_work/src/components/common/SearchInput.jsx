import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange, placeholder = "Search...", containerClass = "" }) => {
  return (
    <div className={`relative ${containerClass}`}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
