import { FaRegClock } from "react-icons/fa";
import StatsCard from "../../src/components/common/StatsCard";
import { FiFileText } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Submissions from "../../src/components/Submissions";
import { useEffect, useMemo, useState } from "react";
import { getAllAttemptsByRole } from "../../src/services";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/slices/authSlice";
import { toast } from "react-toastify";

const ViewSubmissions = () => {
  const user = useSelector(selectUser);
  const [submissions, setSubmissions] = useState([]);
  const [statsData, setStatsData] = useState({}); 

  const fetchSubmissions = async () => {
    try {
      const response = await getAllAttemptsByRole(user?.role);
      const { status, data, stats } = response;

      if (status === 200) {
        setStatsData(stats || {});
        setSubmissions(data || []); 
      } else {
        throw new Error(data?.message || "Failed to fetch submissions");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch submissions");
    }
  };

  useEffect(() => {
    if (user?.role) {
      fetchSubmissions();
    }
  }, [user?.role]);

  // Build cards from stats safely
  const stats = useMemo(() => {
    const total = Number(statsData.total ?? statsData.totalTests ?? 0);
    const graded = Number(statsData.totalEvaluated ?? 0);
    const pendingFromApi = statsData.totalReceived;
    const pending =
      typeof pendingFromApi === "number"
        ? pendingFromApi
        : Math.max(total - graded, 0);

    return [
      {
        label: "Total Submissions",
        value: String(total),
        growthColor: "text-green-600",
        color: "blue",
        rightIcon: <FiFileText className="text-xl" />,
      },
      {
        label: "Graded",
        value: String(graded),
        growthColor: "text-green-600",
        color: "green",
        rightIcon: <IoMdCheckmarkCircleOutline className="text-xl" />,
      },
      {
        label: "Pending Reviews",
        value: String(pending),
        growthColor: "text-orange-600",
        color: "orange",
        rightIcon: <FaRegClock className="text-xl" />,
      },
    ];
  }, [statsData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>
      <Submissions data={submissions} />
    </div>
  );
};

export default ViewSubmissions;
