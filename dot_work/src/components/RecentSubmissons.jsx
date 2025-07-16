import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";

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

const getStatusBadge = (status) => {
  const base = "px-3 py-0.5 text-xs font-semibold rounded-full capitalize";
  if (status === "graded") return `${base} bg-green-700 text-white`;
  if (status === "pending") return `${base} bg-yellow-700 text-white`;
  return base;
};

export default function RecentSubmissions() {
  return (
    <div className="w-[300px] md:w-full bg-white rounded-xl border p-6 shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between  gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Submissions
          </h2>
          <p className="text-sm text-gray-500">
            Latest test submissions and their status
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-100">
            <FiFilter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-100">
            <FiDownload className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[270px] md:w-full mt-6">
        <table className="w-full table-auto text-sm text-left">
          <thead className="border-b bg-primary text-white font-medium">
            <tr>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Test</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr
                key={idx}
                className={`border-b ${
                  sub.status === "pending" ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                  {sub.name}
                </td>
                <td className="py-4 px-4 text-gray-700">{sub.test}</td>
                <td className="py-4 px-4 font-semibold text-gray-900">
                  {sub.score}
                </td>
                <td className="py-4 px-4">
                  <span className={getStatusBadge(sub.status)}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                  <div>{sub.date}</div>
                  <div className="text-xs text-gray-400">{sub.time}</div>
                </td>
                <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100">
                    View
                  </button>
                  <button className="p-2 border border-gray-200 rounded hover:bg-gray-100">
                    <FiDownload className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
