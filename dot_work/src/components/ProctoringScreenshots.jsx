import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectScreenshots,
  selectScreenshotsError,
  selectScreenshotsLoading,
} from "../store/slices/attemptSlice";
import { BsEye } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CloseBtn from "./common/CloseBtn";

const ProctoringScreenshots = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const screenshots = useSelector(selectScreenshots);
  const loading = useSelector(selectScreenshotsLoading);
  const error = useSelector(selectScreenshotsError);

  const handleScreenshotClicked = (index) => {
    setSelectedScreenshot(screenshots[index]);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    setSelectedScreenshot(screenshots[(currentIndex + 1) % screenshots.length]);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
    setSelectedScreenshot(
      screenshots[
        currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1
      ]
    );
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Proctoring Screenshots
        </h2>
        <p className="text-gray-500 text-sm">
          Screenshots captured during the test session (every 5 seconds)
        </p>
      </div>

      {/* Screenshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot._id}
            className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handleScreenshotClicked(index)}
          >
            {/* Screenshot Container */}
            <div className="aspect-video rounded-lg overflow-hidden shadow-md transition-all duration-300">
              {screenshot.isActive ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white opacity-70" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img src={screenshot.secure_url} alt="screenshot" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <div className="text-white text-center">
                  <BsEye className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">View</span>
                </div>
              </div>
            </div>

            {/* Active Indicator */}
            {screenshot.isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/3 h-auto p-4">
            <img
              src={selectedScreenshot.secure_url}
              alt="Full Screenshot"
              className="w-full h-full"
            />
            <div className="absolute top-52 left-0 w-full flex justify-between px-4 py-2">
              <button
                onClick={handlePrev}
                className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100"
              >
                <BiChevronRight className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-5 right-5 text-white "
            >
              <CloseBtn />
            </button>
          </div>
        </div>
      )}

      {/* Download Button */}
      <div className="flex justify-center">
        <button className="inline-flex items-center text-sm px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download All Screenshots (ZIP)
        </button>
      </div>
    </div>
  );
};

export default ProctoringScreenshots;
