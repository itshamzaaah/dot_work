import {
  FaFileAlt,
  FaUser,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import StatsCard from "../../src/components/StatsCard";
import RecentSubmissions from "../../src/components/RecentSubmissons";

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
//   {
//     label: "System Health",
//     value: "99.9%",
//     icon: <FiCheckCircle className="text-green-500" />,
//     growthText: "All systems operational",
//     growthColor: "text-green-600",
//     color: "greenLight",
//     rightIcon: <FiCheckCircle className="text-xl" />,
//   },
];

const submissions = [
  {
    name: "John Doe",
    test: "Frontend Developer Assessment",
    score: "85%",
    status: "graded",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    name: "Sarah Wilson",
    test: "Data Analyst Test",
    score: "92%",
    status: "graded",
    date: "2024-01-15",
    time: "13:45",
  },
  {
    name: "Mike Johnson",
    test: "Backend Developer Test",
    score: "-",
    status: "pending",
    date: "2024-01-15",
    time: "12:20",
  },
  {
    name: "Emily Chen",
    test: "UI/UX Designer Assessment",
    score: "78%",
    status: "graded",
    date: "2024-01-14",
    time: "16:15",
  },
];

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat}/>
        ))}
      </div>
      <RecentSubmissions />
    </div>
  );
}
