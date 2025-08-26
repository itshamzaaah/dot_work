import React, { useEffect, useState } from "react";
import { getAllTests } from "../../src/services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Tests = () => {
  const [tests, setTests] = useState([]);

  const fetchTests = async () => {
    const response = await getAllTests();
    setTests(response);
  };
  useEffect(() => {
    try {
      fetchTests();
    } catch (error) {
      toast.error(error);
    }
  }, []);
  return (
    <div>
      <div className="space-y-4">
        {tests.tests?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tests available.</p>
          </div>
        ) : (
          tests.tests?.map((test, index) => (
            <div
              key={test._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {index + 1}. {test.testName}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {test._id}</p>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/test/add-candidates/${test._id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Add Candidates
                  </Link>
                  <Link
                    to={`/test/details/${test._id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tests;
