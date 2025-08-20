import { FaRegClock } from "react-icons/fa";
import StatsCard from "../../src/components/common/StatsCard";
import { FiFileText } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Submissions from "../../src/components/Submissions";
import { useEffect, useState } from "react";
import { getAllAttempts } from "../../src/services";

export const stats = [
  {
    label: "Total Submissions",
    value: "24",
    growthColor: "text-green-600",
    color: "blue",
    rightIcon: <FiFileText className="text-xl" />,
  },
  {
    label: "Graded",
    value: "156",
    growthColor: "text-green-600",
    color: "green",
    rightIcon: <IoMdCheckmarkCircleOutline className="text-xl" />,
  },
  {
    label: "Pending Reviews",
    value: "8",
    growthColor: "text-orange-600",
    color: "orange",
    rightIcon: <FaRegClock className="text-xl" />,
  },
];

const ViewSubmissions = () => {
  const [submissions, SetSubmissions] = useState([]);


  const fetchSubmissions = async () => {
    try {
      const response = await getAllAttempts();
      if (response.status === 200) {
        SetSubmissions(response?.data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch submissions");
    }
  };

  useEffect(() => {
    try {
      fetchSubmissions();
    } catch (error) {
      toast.error(error);
    }
  }, []);
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <Submissions data={submissions} />
    </div>
  );
};

export default ViewSubmissions;
