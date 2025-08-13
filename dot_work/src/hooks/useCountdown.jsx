import { useEffect, useRef, useState } from "react";

const useCountdown = (minutes = 0, onTimeUp = () => {}) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => { onTimeUpRef.current = onTimeUp; }, [onTimeUp]);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTest = () => {
    if (isActive) return;
    
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clear();
          setIsActive(false);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => () => clear(), []);

  return { secondsLeft, isActive, startTest, formatTime };
}

export default useCountdown