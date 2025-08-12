import React, { useEffect, useState } from "react";
import { getMyTests } from "../../src/services";
import { toast } from "react-toastify";
import TestCard from "../../src/components/TestCard";

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
    <div>
      {tests?.tests?.map((test) => (
        <TestCard key={test._id} testData={test} />
      ))}
    </div>
  );
};

export default MyTests;
