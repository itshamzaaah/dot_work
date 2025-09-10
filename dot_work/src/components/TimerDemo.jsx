// TimerDemo.jsx
import { useState } from "react";
import useCountdown from "../hooks/useCountdown";
import TimerDisplay from "../components/TimerDisplay";

export default function TimerDemo() {
  const [minsInput, setMinsInput] = useState("1");

  const minutes = Number(minsInput);
  const validMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 0;

  const { remainingMs } = useCountdown({
    duration: validMinutes,
    onExpire: () => alert("Time up!"), // new function identity every render
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">Isolated Timer (no pause/stop)</h2>
      <label className="block mb-3 text-sm">
        Duration (minutes)
        <input
          type="number"
          min={1}
          step={1}
          value={minsInput}
          onChange={(e) => setMinsInput(e.target.value)} // keep as string
          className="mt-1 w-28 px-2 py-1 border rounded"
        />
      </label>

      <TimerDisplay remainingMs={remainingMs} className="mb-4" />
      <p className="text-xs text-slate-500">
        Starts automatically when the value is a positive number. No
        pause/stop/resume.
      </p>
    </div>
  );
}
