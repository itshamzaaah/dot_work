import {
  IoDocumentTextOutline,
  IoAddOutline,
  IoCameraOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const steps = [
  { label: "Basic Info", icon: <IoDocumentTextOutline size={20} /> },
  { label: "Add Questions", icon: <IoAddOutline size={20} /> },
  { label: "Proctoring", icon: <IoCameraOutline size={20} /> },
  { label: "Sharing", icon: <IoShareSocialOutline size={20} /> },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-4xl block mx-auto px-2 md:px-6">
        <div className="flex items-center py-6">
          {steps.map((step, index) => {
            const isActive = currentStep === index + 1;
            const isCompleted = currentStep > index + 1;

            return (
              <div className="flex items-center" key={step.label}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : isCompleted
                        ? "bg-primary text-white"
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
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-primary"
                          : "text-gray-400"
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
                      isActive || isCompleted ? "bg-primary" : "bg-gray-200"
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
