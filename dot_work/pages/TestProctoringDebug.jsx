import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { proctoringStore } from "../src/proctoring/proctoringStore";


export default function TestProctoringDebug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const webcam = proctoringStore.getWebcamStream();
    const screen = proctoringStore.getScreenStream();

    if (!webcam || !screen) {
      // If streams are missing (e.g. direct open), send back to consent
      navigate(`/consent/${slug}`, { replace: true });
      return;
    }

    if (webcamRef.current) {
      webcamRef.current.srcObject = webcam;
      webcamRef.current.play().catch(() => {});
    }
    if (screenRef.current) {
      screenRef.current.srcObject = screen;
      screenRef.current.play().catch(() => {});
    }

    return () => {
      // keep streams running across the test; do not stop here
    };
  }, [slug, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Proctoring Debug Preview</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded border p-3">
          <h2 className="text-sm font-medium mb-2">Webcam</h2>
          <video ref={webcamRef} className="w-full rounded bg-black" muted playsInline />
        </div>

        <div className="rounded border p-3">
          <h2 className="text-sm font-medium mb-2">Screen Share</h2>
          <video ref={screenRef} className="w-full rounded bg-black" muted playsInline />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 rounded border border-slate-200"
        >
          Back
        </button>
        <button
          onClick={() => {
            proctoringStore.stopAll();
            alert("Stopped all streams.");
          }}
          className="px-3 py-2 rounded bg-rose-600 text-white"
        >
          Stop Streams
        </button>
      </div>
    </div>
  );
}
