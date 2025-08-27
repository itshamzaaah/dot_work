export function extractDateTime(isoString, timeZone = "Asia/Karachi") {
  const d = new Date(isoString);

  const date = new Intl.DateTimeFormat("en-CA", {
    // YYYY-MM-DD
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);

  const time = new Intl.DateTimeFormat("en-GB", {
    // 24h HH:MM:SS
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);

  return date;
}

// Fixed helper functions
export const randomDelays = () => 20000;

export const getScaledImages = (w, h, maxW = 1280, maxH = 720) => {
  // Guard if video dims are 0 (video not ready yet)
  if (!w || !h) return { w: Math.min(maxW, 1280), h: Math.min(maxH, 720) };
  const ratio = Math.min(maxW / w, maxH / h, 1);
  return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
};

export const canvasToBlob = async (canvas, webpQ = 0.7, jpegQ = 0.65) => {
  try {
    // Prefer WebP; fallback to JPEG
    const webp = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('WebP conversion failed'));
      }, "image/webp", webpQ);
    });
    return webp;
  } catch (error) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('JPEG conversion failed'));
      }, "image/jpeg", jpegQ);
    });
  }
};