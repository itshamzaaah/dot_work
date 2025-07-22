import React, { useState } from 'react';

const ProctoringScreenshots = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const screenshots = [
    { id: 1, timestamp: "14:30:25", isActive: true },
    { id: 2, timestamp: "14:30:30", isActive: false },
    { id: 3, timestamp: "14:30:35", isActive: false },
    { id: 4, timestamp: "14:30:40", isActive: false },
    { id: 5, timestamp: "14:30:45", isActive: false },
    { id: 6, timestamp: "14:30:50", isActive: false }
  ];

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="mr-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Proctoring Screenshots</h2>
        </div>
        <p className="text-gray-500 text-sm">Screenshots captured during the test session (every 5 seconds)</p>
      </div>

      {/* Screenshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredImage(screenshot.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Screenshot Container */}
            <div className={`aspect-video rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
              screenshot.isActive 
                ? 'bg-gray-600 shadow-lg' 
                : 'bg-gray-200 hover:shadow-lg'
            }`}>
              
              {/* Active Screenshot with Eye Icon */}
              {screenshot.isActive ? (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
              ) : (
                /* Inactive Screenshot with Small Image Icon */
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                hoveredImage === screenshot.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm">View</span>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {screenshot.timestamp}
            </div>

            {/* Active Indicator */}
            {screenshot.isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button className="inline-flex items-center text-sm px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download All Screenshots (ZIP)
        </button>
      </div>
    </div>
  );
};

export default ProctoringScreenshots;