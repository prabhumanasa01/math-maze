export const calculateScore = (timeElapsed) => {
  if (timeElapsed <= 5) return 30;
  if (timeElapsed <= 10) return 15;
  return 5;
};