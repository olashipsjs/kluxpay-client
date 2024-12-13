import React from 'react';

const useCountDown = (
  duration: number,
  options?: {
    debug?: boolean;
    reset: boolean;
    resetDelay?: number;
    resetFn?: (timeLeft?: number) => any;
  }
) => {
  const { debug, reset, resetDelay, resetFn } = options || {};
  const [timeLeft, setTimeLeft] = React.useState<number>(duration * 60);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
      if (debug) {
        console.log('The time left is: ', timeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [debug]);

  React.useEffect(() => {
    if (reset) {
      const timer = setTimeout(() => {
        if (resetFn) resetFn(timeLeft);
        setTimeLeft(duration * 60);
      }, resetDelay);

      return () => clearTimeout(timer);
    }
  }, [reset, resetDelay, resetFn]);

  const minute = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minute,
    seconds,
    timeLeft,
  };
};

export default useCountDown;
