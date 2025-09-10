import React, { useEffect, useState } from "react";
import { getMyTests } from "../../src/services";
import { toast } from "react-toastify";
import TestCard from "../../src/components/TestCard";
import PageHeader from "../../src/components/common/PageHeader";

const MyTests = () => {
  const [tests, setTests] = useState([]);

  const fetchTests = async () => {
    try {
      const response = await getMyTests();
      setTests(response);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tests");
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <>
    <PageHeader
        title="My Tests"
        description="Manage your tests"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 overflow-y-auto">
        {tests?.tests?.map((test) => (
          <TestCard key={test._id} testData={test} />
        ))}
      </div>
    </>
  );
};

export default MyTests;
