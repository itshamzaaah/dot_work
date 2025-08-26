import { IoEyeOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { HiPlus } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { VscCloudUpload } from "react-icons/vsc";

export const pageHeaderConfig = [
  {
    path: "/dashboard",
    matchType: "exact",
    title: "Dashboard",
    subtitle: "Your overview of the platform",
    actions: [
      {
        label: "Create Test",
        icon: HiPlus,
        actionType: "viewDetails",
        variant: "primary",
      },
    ],
  },
  {
    path: "/create-test",
    matchType: "exact",
    title: "Create New Test",
    subtitle: (data) => `${data?.userName ? `Hello, ${data.userName}` : "Design your assessment"}`,
    actions: [
      {
        label: "Publish Test",
        icon: VscCloudUpload,
        actionType: "publishTest",
        variant: "primary",
      },
    ],
  },
  {
    path: "/tests",
    matchType: "exact",
    title: "All Tests",
    subtitle: (data) => `${data?.userName ? `Hello, ${data.userName}` : "Design your assessment"}`,
    actions: [
      // {
      //   label: "Publish Test",
      //   icon: VscCloudUpload,
      //   actionType: "publishTest",
      //   variant: "primary",
      // },
    ],
  },
  {
    path: "/test-report/",
    matchType: "startsWith",
    title: "Test Report",
    subtitle: ({ candidateName, testName }) => `${candidateName} - ${testName}`,
    actions: [
      {
        label: "Download PDF",
        icon: LuDownload,
        actionType: "downloadPDF",
        variant: "primary",
      },
    ],
  },
  {
    path: "/view-submissions",
    matchType: "exact",
    title: "View Submissions",
    subtitle: "Monitor and manage test submissions",
    actions: [
      {
        label: "Send Results",
        icon: TbSend,
        actionType: "sendResults",
        variant: "primary",
      },
    ],
  },
    {
    path: "/users",
    matchType: "startsWith",
    title: "User Management",
    subtitle: "Manage Platform users and their permissions",
    actions: [
      {
        label: "Add User",
        icon: HiPlus,
        iconSize: 16,
        textSize: "text-xs",
        actionType: "openAddUserModal",
        variant: "primary",
      },
    ],
  },
];

