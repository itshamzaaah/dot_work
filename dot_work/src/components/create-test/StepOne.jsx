import { IoChevronDown } from "react-icons/io5";
import TextInput from "../TextInput";
import { useDispatch, useSelector } from "react-redux";
import { updateStepOne } from "../../store/slices/createTestSlice";

const StepOne = () => {

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.testForm.stepOne);

  const handleInputChange = (field, value) => {
    dispatch(updateStepOne({ [field]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">
          Set up the fundamental details of your test
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Test Name and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Test Name"
            name="testName"
            type="text"
            value={formData.testName}
            onChange={handleInputChange}
            placeholder="e.g., Frontend Developer Assessment"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
              >
                <option value="">Select category</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="general">General Knowledge</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <IoChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
          />
    
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe what this test evaluates..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
