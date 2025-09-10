export const msToClock = (ms) => {
  if (ms === null) return "--:--:--";
  const total = Math.max(0, Math.ceil(ms / 1000)); // convert to seconds and ensure non-negative
  const hour = Math.floor(total / 3600);
  const min = Math.floor((total % 3600) / 60);
  const sec = total % 60;

  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(hour)}:${pad(min)}:${pad(sec)}`;
};
