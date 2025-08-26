// Simple module-scope store for live MediaStreams
let webcamStream = null;
let screenStream = null;

export const proctoringStore = {
  setWebcamStream(s) { webcamStream = s; },
  getWebcamStream()  { return webcamStream; },
  setScreenStream(s) { screenStream = s; },
  getScreenStream()  { return screenStream; },
  stopAll() {
    [webcamStream, screenStream].forEach((s) => {
      if (s) s.getTracks().forEach(t => t.stop());
    });
    webcamStream = null;
    screenStream = null;
  }
};
