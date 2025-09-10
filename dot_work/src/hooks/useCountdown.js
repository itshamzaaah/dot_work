import { useEffect, useRef, useState } from "react";

export default function useCountdown({ duration, onExpire }) {
  const [remainingMs, setRemainingMs] = useState(null);
  const intervalRef = useRef(null);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  // Keep the latest callback without changing effect identity
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const mins = Number(duration);
    if (!Number.isFinite(mins) || mins <= 0) {
      setRemainingMs(null);
      return;
    }

    const targetTime = Date.now() + mins * 60 * 1000;
    expiredRef.current = false;

    const tick = () => {
      const ms = Math.max(0, targetTime - Date.now());
      setRemainingMs(ms);
      if (ms === 0 && !expiredRef.current) {
        expiredRef.current = true;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onExpireRef.current?.();
      }
    };

    tick(); // paint immediately
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [duration]); // <-- only depend on duration

  return { remainingMs };
}
