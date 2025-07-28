import { useDispatch, useSelector } from "react-redux";
import { updateStepOne } from "../../store/slices/createTestSlice";
import { categoryOptions } from "../../constants/data";
import TextInput from "../common/TextInput";
import SelectDropdown from "../common/SelectDropdown";

const StepOne = ({ errors = {} }) => {
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
          <div>
            <TextInput
              label="Test Name"
              name="testName"
              type="text"
              value={formData.testName}
              onChange={handleInputChange}
              placeholder="e.g., Frontend Developer Assessment"
              error={errors.testName}
            />
            {errors.testName && (
              <p className="text-sm text-red-500 mt-1">{errors.testName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <SelectDropdown
              value={formData.category}
              onChange={(val) => handleInputChange("category", val)}
              options={categoryOptions}
              error={errors.category}
            />
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">{errors.category}</p>
            )}
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
            error={errors.duration}
          />
          {errors.duration && (
            <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
          )}
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
            spellCheck="true"
            className={`w-full px-4 py-3 border ${
              errors.description ? "border-red-400" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none`}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
