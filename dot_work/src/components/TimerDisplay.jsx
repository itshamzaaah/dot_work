import { msToClock } from "../utils/time";

const TimerDisplay = ({ remainingMs, className = "" }) => {
  const danger = remainingMs !== null && remainingMs <= 60_000;

  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-2 rounded-xl shadow-lg 
      font-extrabold tracking-widest text-lg sm:text-xl md:text-2xl
      ${
        danger
          ? "bg-red-100 text-red-700 ring-2 ring-red-400 animate-pulse"
          : "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400"
      } ${className}`}
      aria-live="polite"
    >
      <span className="mr-2 uppercase text-xs font-semibold text-slate-600">
        Time Left
      </span>
      <span>{msToClock(remainingMs)}</span>
    </div>
  );
};

export default TimerDisplay;
