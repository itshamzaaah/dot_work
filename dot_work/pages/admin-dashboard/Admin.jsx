import { HiPlus } from "react-icons/hi";
import PageHeader from "../../src/components/common/PageHeader";
import ViewSubmissions from "./ViewSubmissions";

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Manage your tests and view submissions"
        button={{
          label: "Create Test",
          icon: HiPlus,
          to: "/create-test",
        }}
      />
      <div className="w-full">
        <ViewSubmissions />
      </div>
    </>
  );
}
