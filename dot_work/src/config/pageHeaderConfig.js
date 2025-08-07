import { IoEyeOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { HiPlus } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { VscCloudUpload } from "react-icons/vsc";

export const pageHeaderConfig = [
  {
    path: "/dashboard",
    matchType: "startsWith",
    component: Navbar,
  },
  {
    path: "/create-test",
    matchType: "startsWith",
    title: "Create New Test",
    subtitle: "Design and configure your assessment",
    actions: [
      {
        label: "Preview",
        icon: IoEyeOutline,
        to: "/preview",
        variant: "text",
      },
      {
        label: "Publish",
        icon: VscCloudUpload,
        iconSize: 16,
        textSize: "text-xs",
        actionType: "publishTest",
        variant: "primary",
      },
    ],
  },
  {
    path: "/view-submissions",
    matchType: "startsWith",
    title: "View Submissions",
    subtitle: "Monitor and manage test submissions",
    actions: [
      {
        label: "Send Results",
        icon: TbSend,
        iconSize: 16,
        textSize: "text-xs",
        actionType: "sendResults",
        variant: "primary",
      },
    ],
  },
  {
    path: "/test-report/",
    matchType: "startsWith",
    title: "Test Result Report",
    subtitle: "John Doe - Front End developer",
    actions: [
      {
        label: "Download PDF",
        icon: LuDownload,
        iconSize: 16,
        textSize: "text-xs",
        actionType: "downloadPDF",
        variant: "primary",
      },
      {
        label: "Download ZIP",
        icon: LuDownload,
        iconSize: 16,
        textSize: "text-xs",
        actionType: "downloadZIP",
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
