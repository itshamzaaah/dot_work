import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { proctoringStore } from "../../src/proctoring/proctoringStore";

const newSessionId = () => crypto.randomUUID?.() || String(Date.now());

export default function ProctoringConsent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!agreed || loading) return;
    setLoading(true);
    try {
      // 1) Webcam (video only)
      const webcam = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      // 2) Screen share (must be triggered by user gesture)
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "motion" }, // shows cursor on movement
        audio: false
      });

      // Save to store so the test page can use them
      proctoringStore.setWebcamStream(webcam);
      proctoringStore.setScreenStream(screen);

      // if user manually stops screen sharing, end/cleanup
      const screenTrack = screen.getVideoTracks()[0];
      if (screenTrack) {
        screenTrack.addEventListener("ended", () => {
          proctoringStore.stopAll();
          // You could redirect back or show a toast on your test page
          console.warn("Screen share stopped by user.");
        });
      }

      // Session id for linking screenshots later
      const sessionId = newSessionId();
      localStorage.setItem("proctoringSessionId", sessionId);
      localStorage.setItem("proctoringTestSlug", slug);

      // Navigate to your test route
      navigate(`/test/${slug}`);
    } catch (err) {
      console.error(err);
      alert(
        "We need permission for webcam and screen sharing to start the test. Please allow both and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Proctoring Consent</h1>
        <p className="text-slate-600 text-sm mb-4">
          We’ll request access to your <b>webcam</b> and <b>screen share</b>. Periodic screenshots (no audio) may be taken during your test.
        </p>

        <ul className="list-disc text-sm text-slate-700 pl-5 space-y-2 mb-5">
          <li>Webcam access (video only).</li>
          <li>Screen sharing during the test session.</li>
          <li>Screenshots may be taken every 20–30 seconds.</li>
          <li>Stopping screen share may end the test session.</li>
        </ul>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            id="agreeAll"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-slate-800">
            I agree to the above proctoring terms.
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!agreed || loading}
            onClick={handleContinue}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              agreed && !loading ? "bg-primary hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Requesting permissions..." : "I Agree & Continue"}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Tip: Use Chrome/Edge on HTTPS (or localhost) for best compatibility.
        </p>
      </div>
    </div>
  );
}
