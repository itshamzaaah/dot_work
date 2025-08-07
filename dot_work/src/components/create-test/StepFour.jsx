import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateStepFour } from "../../store/slices/createTestSlice";
import { toast } from "react-toastify";

export default function StepFour() {
  const dispatch = useDispatch();
  const { enableProctoring, screenShotFrequency, forceFullScreen } =
    useSelector((state) => state.testForm.stepFour);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const frequencyOptions = [
    { title: "Every 5 seconds", value: 5 },
    { title: "Every 10 seconds", value: 10 },
    { title: "Every 30 seconds", value: 30 },
    { title: "Every 60 seconds", value: 60 },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        onClick={onChange}
        className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Proctoring Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure monitoring and security options
        </p>
      </div>

      {/* Enable Proctoring */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enable Proctoring
          </label>
          <p className="text-sm text-gray-500">
            Monitor candidates during the test
          </p>
        </div>
        <ToggleSwitch
          checked={enableProctoring}
          onChange={() =>
            dispatch(updateStepFour({ enableProctoring: !enableProctoring }))
          }
        />
      </div>

      {/* Screenshot Frequency */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Screenshot Frequency (seconds)
        </label>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex items-center justify-between"
          >
            <span>{screenShotFrequency}</span>
            <IoChevronDown
              className={`w-4 h-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {frequencyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    dispatch(
                      updateStepFour({ screenShotFrequency: option.value })
                    ),
                      setDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {option.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Force Full Screen */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Force Full Screen
          </label>
          <p className="text-sm text-gray-500">
            Require candidates to stay in full screen mode
          </p>
        </div>
        <ToggleSwitch
          checked={forceFullScreen}
          onChange={() =>
            dispatch(updateStepFour({ forceFullScreen: !forceFullScreen }))
          }
        />
      </div>
    </div>
  );
}
