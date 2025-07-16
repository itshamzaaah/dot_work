import { useState } from "react";
import StepOne from "../../src/components/create-test/StepOne";
import PageHeader from "../../src/components/PageHeader";
import Stepper from "../../src/components/Stepper";
import { IoSaveOutline } from "react-icons/io5";
import StepTwo from "../../src/components/create-test/StepTwo";
import StepThree from "../../src/components/create-test/StepThree";
import StepFour from "../../src/components/create-test/StepFour";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../src/store/slices/createTestSlice";
import {
  validateStepOne,
  validateStepThree,
  validateStepTwo,
} from "../../src/utils/validation";

const CreateTest = () => {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.testForm.currentStep);
  const formData = useSelector((state) => state.testForm);

  const next = () => {
    if (currentStep === 1) {
      const { success, errors } = validateStepOne(formData.stepOne);
      if (!success) {
        setErrors(errors);
        return;
      }
    }

    if (currentStep === 2) {
      const { success, errors } = validateStepTwo(formData.stepTwo);
      if (!success) {
        setErrors(errors);
        return;
      }
    }

    if (currentStep === 3) {
      const { success, errors } = validateStepThree(formData.stepThree);
      if (!success) {
        setErrors(errors);
        return;
      }
    }
    setErrors({});
    dispatch(setCurrentStep(Math.min(currentStep + 1, 4)));
  };

  const previous = () => dispatch(setCurrentStep(Math.max(currentStep - 1, 1)));

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne errors={errors} />;
      case 2:
        return <StepTwo errors={errors} />;
      case 3:
        return <StepThree errors={errors} />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne errors={errors} />;
    }
  };

  const renderButtons = (currentStep, next, previous) => {
    const buttonTextMap = {
      1: "Continue to Questions",
      2: "Continue to Proctoring",
      3: "Continue to Sharing",
      4: "Generate and Send Invitations",
    };

    const buttonText = buttonTextMap[currentStep] || "Next";

    if (currentStep === 1) {
      return (
        <div className="mt-5">
          <button
            onClick={next}
            className="text-center w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="ml-2">{buttonText}</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={previous}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="bg-black text-sm text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Stepper currentStep={currentStep} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {renderCurrentStep()}
            {renderButtons(currentStep, next, previous)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;


/* import { useState, useEffect } from "react";
import StepOne from "../../src/components/create-test/StepOne";
import PageHeader from "../../src/components/PageHeader";
import Stepper from "../../src/components/Stepper";
import { IoSaveOutline } from "react-icons/io5";
import StepTwo from "../../src/components/create-test/StepTwo";
import StepThree from "../../src/components/create-test/StepThree";
import StepFour from "../../src/components/create-test/StepFour";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../src/store/slices/createTestSlice";
import {
  validateStepOne,
  validateStepThree,
  validateStepTwo,
} from "../../src/utils/validation";

const CreateTest = () => {
  const [errors, setErrors] = useState({});
  const [touchedSteps, setTouchedSteps] = useState({ 1: false, 2: false, 3: false });

  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.testForm.currentStep);
  const formData = useSelector((state) => state.testForm);

  const next = () => {
    // Mark current step as touched
    if (!touchedSteps[currentStep]) {
      setTouchedSteps((prev) => ({ ...prev, [currentStep]: true }));
    }

    let validationResult;
    if (currentStep === 1) {
      validationResult = validateStepOne(formData.stepOne);
    } else if (currentStep === 2) {
      validationResult = validateStepTwo(formData.stepTwo);
    } else if (currentStep === 3) {
      validationResult = validateStepThree(formData.stepThree);
    }

    if (validationResult && !validationResult.success) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});
    dispatch(setCurrentStep(Math.min(currentStep + 1, 4)));
  };

  const previous = () => dispatch(setCurrentStep(Math.max(currentStep - 1, 1)));

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne errors={errors} setErrors={setErrors} />;
      case 2:
        return <StepTwo errors={errors} setErrors={setErrors} />;
      case 3:
        return <StepThree errors={errors} setErrors={setErrors} />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };

  const renderButtons = (currentStep, next, previous) => {
    const buttonTextMap = {
      1: "Continue to Questions",
      2: "Continue to Proctoring",
      3: "Continue to Sharing",
      4: "Generate and Send Invitations",
    };

    const buttonText = buttonTextMap[currentStep] || "Next";

    if (currentStep === 1) {
      return (
        <div className="mt-5">
          <button
            onClick={next}
            className="text-center w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="ml-2">{buttonText}</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={previous}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="bg-black text-sm text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (!touchedSteps[currentStep]) return;

    if (currentStep === 1) {
      const { success, errors: stepErrors } = validateStepOne(formData.stepOne);
      setErrors(success ? {} : stepErrors);
    } else if (currentStep === 2) {
      const { success, errors: stepErrors } = validateStepTwo(formData.stepTwo);
      setErrors(success ? {} : stepErrors);
    } else if (currentStep === 3) {
      const { success, errors: stepErrors } = validateStepThree(formData.stepThree);
      setErrors(success ? {} : stepErrors);
    }
  }, [formData.stepOne, formData.stepTwo, formData.stepThree, currentStep, touchedSteps]);

  return (
    <div className="w-full">
      <Stepper currentStep={currentStep} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {renderCurrentStep()}
            {renderButtons(currentStep, next, previous)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
 */