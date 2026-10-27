import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime = 30, isPaused = false, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const startTime = useRef(Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      const remaining = initialTime - elapsed;
      
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        if (onTimeout) onTimeout();
      } else {
        setTimeLeft(remaining);
      }
    }, 100); 

    return () => clearInterval(timerRef.current);
  }, [initialTime, isPaused, onTimeout]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    startTime.current = Date.now();
    setTimeLeft(initialTime);
  };

  return { timeLeft, resetTimer, elapsed: initialTime - timeLeft };
};