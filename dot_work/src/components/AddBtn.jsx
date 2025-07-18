import { FaPlus } from "react-icons/fa";

const AddBtn = ({ label, onClick, width = 4, height = 2 }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 border border-gray-300 text-sm px-${width} py-${height} rounded-lg hover:bg-gray-50 transition`}
  >
    <FaPlus className="text-gray-500" /> {label}
  </button>
);

export default AddBtn;
