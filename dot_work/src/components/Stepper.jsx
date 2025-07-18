import {
  IoDocumentTextOutline,
  IoAddOutline,
  IoCameraOutline,
} from "react-icons/io5";
import { MdSchedule } from "react-icons/md";

const steps = [
  { label: "Basic Info", icon: <IoDocumentTextOutline size={20} /> },
  { label: "Add Questions", icon: <IoAddOutline size={20} /> },
  { label: "Scheduling", icon: <MdSchedule size={20} /> },
  { label: "Proctoring", icon: <IoCameraOutline size={20} /> },
];

const colorMap = [
  "bg-primary text-white",
  "bg-purple-600 text-white",
  "bg-green-600 text-white",
  "bg-pink-600 text-white",
];

const connectorColorMap = [
  "bg-primary",
  "bg-purple-600",
  "bg-green-600",
  "bg-pink-600",
];

const labelColorMap = [
  "text-primary",
  "text-purple-600",
  "text-green-600",
  "text-pink-600",
];

export default function Stepper({ currentStep }) {
  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-4xl block mx-auto px-2 md:px-6">
        <div className="flex items-center py-4">
          {steps.map((step, index) => {
            const isActive = currentStep === index + 1;
            const isCompleted = currentStep > index + 1;

            const activeColor = colorMap[index];
            const connectorColor = connectorColorMap[index];
            const labelColor = labelColorMap[index];

            return (
              <div className="flex items-center" key={step.label}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full
                    ${
                      isActive || isCompleted
                        ? activeColor
                        : "bg-gray-100 border-2 border-gray-300"
                    }`}
                  >
                    <span
                      className={
                        isActive || isCompleted ? "text-white" : "text-gray-400"
                      }
                    >
                      {step.icon}
                    </span>
                  </div>
                  <div className="ml-0 md:ml-3">
                    <p
                      className={`text-sm hidden md:block font-medium ${
                        isActive || isCompleted ? labelColor : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={`w-5 md:w-16 h-[3px] ${
                      isActive || isCompleted ? connectorColor : "bg-gray-200"
                    } mx-4`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
