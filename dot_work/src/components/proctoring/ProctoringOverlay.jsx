import { useEffect, useRef, useState } from "react";
import { proctoringStore } from "../../proctoring/proctoringStore";

function fmt(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/** Small webcam PIP pinned on top-left (pointer-events: none so it never blocks clicks) */
export default function ProctoringOverlay({ corner = "bl", width = 180, height = 120 }) {
  const webcamRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stream = proctoringStore.getWebcamStream();
    if (stream && webcamRef.current) {
      webcamRef.current.srcObject = stream;
      webcamRef.current.play().catch(() => {});
    }
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const posClass =
    {
      tl: "top-3 left-3",
      tr: "top-3 right-3",
      bl: "bottom-3 left-3",
      br: "bottom-3 right-3",
    }[corner];

  return (
    <div className={`fixed ${posClass} z-50 pointer-events-none`}>
      <div
        className="relative overflow-hidden rounded-xl shadow-xl ring-2 ring-white/70 bg-black"
        style={{ width, height }}
      >
        <video
          ref={webcamRef}
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1 flex items-center gap-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>REC {fmt(elapsed)}</span>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
          Webcam
        </div>
      </div>
    </div>
  );
}
