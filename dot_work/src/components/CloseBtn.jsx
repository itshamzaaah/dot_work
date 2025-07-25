import { RxCross2 } from "react-icons/rx";

const CloseBtn = ({ onClose, hideClass = "lg:block" }) => {
  return (
    <button
      className={`${hideClass} p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all duration-200 shadow-sm`}
      onClick={onClose}
    >
      <RxCross2 className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default CloseBtn;
