
// Color utility map
const colorMap = {
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-200", 
    icon: "text-green-600",
  },
  greenLight: {
    bg: "bg-green-100",
    icon: "text-green-600",
  },
  orange: {
    bg: "bg-orange-100",
    icon: "text-orange-600",
  },
  default: {
    bg: "bg-gray-100",
    icon: "text-gray-600",
  },
};

const StatsCard = ({
  label,
  value,
  icon,
  growthText,
  growthColor,
  rightIcon,
  color,
}) => {
  const colors = colorMap[color] || colorMap.default;

  return (
    <div className="flex justify-between items-center bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full">
        <h4 className="text-sm font-medium text-gray-500">{label}</h4>
        <div className="flex justify-between w-full">
          <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
          <div className={`p-3 rounded-full ${colors.bg}`}>
            <div className={`${colors.icon}`}>{rightIcon}</div>
          </div>
        </div>
        <p className={`text-sm mt-1 flex items-center gap-1 ${growthColor}`}>
          {icon}
          {growthText}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;