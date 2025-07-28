import {
  FiArrowUpRight,
  FiUsers,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import StatsCard from "../../src/components/common/StatsCard";
import RecentSubmissions from "../../src/components/RecentSubmissons";
import Navbar from "../../src/components/Navbar";

export const stats = [
  {
    label: "Total Tests",
    value: "24",
    icon: <FiArrowUpRight className="text-green-500" />,
    growthText: "+12% from last month",
    growthColor: "text-green-600",
    color: "blue",
    rightIcon: <FiFileText className="text-xl" />,
  },
  {
    label: "Active Candidates",
    value: "156",
    icon: <FiArrowUpRight className="text-green-500" />,
    growthText: "+8% from last week",
    growthColor: "text-green-600",
    color: "green",
    rightIcon: <FiUsers className="text-xl" />,
  },
  {
    label: "Pending Evaluations",
    value: "8",
    icon: <FiAlertCircle className="text-orange-500" />,
    growthText: "Requires attention",
    growthColor: "text-orange-600",
    color: "orange",
    rightIcon: <FiAlertCircle className="text-xl" />,
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        <RecentSubmissions />
      </div>
    </>
  );
}
