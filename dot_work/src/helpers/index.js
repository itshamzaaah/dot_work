import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { toast } from "react-toastify";

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
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("WebP conversion failed"));
        },
        "image/webp",
        webpQ
      );
    });
    return webp;
  } catch (error) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("JPEG conversion failed"));
        },
        "image/jpeg",
        jpegQ
      );
    });
  }
};

export const downloadScreenshotsAsZip = async (
  screenshots,
  candidateName = "candidate",
  testName = "test"
) => {
  const zip = new JSZip();

  const safeCandidateName = candidateName
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  const safeTestName = testName
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");

  for (let i = 0; i < screenshots.length; i++) {
    const screenshot = screenshots[i];
    const imageUrl = screenshot.secure_url;
    const imageName = `screenshot_${i + 1}.webp`;

    try {
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();
      zip.file(imageName, imageBlob);
    } catch (error) {
      toast.error(error);
    }
  }

  // Once all images are added, generate the zip and trigger the download
  try {
    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, `${safeCandidateName}-${safeTestName}-screenshots.zip`);
    toast.success("Screenshots downloaded successfully");
  } catch (error) {
    toast.error(error);
  }
};

// Helper function to generate the PDF from the provided response data
export const generateTestResultPDF = (data) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;

  // Helper function to add text and handle page breaks
  const addText = (text, x, y, fontSize = 12, lineHeight = 10) => {
    const lines = doc.splitTextToSize(text, 170); // Wrap text to fit page width
    lines.forEach((line) => {
      if (y > pageHeight - 20) {
        // If near bottom, add a new page
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(fontSize);
      doc.text(line, x, y);
      y += lineHeight;
    });
    return y;
  };

  // --- Title ---
  doc.setFontSize(18);
  let yPos = 20;
  yPos = addText("Test Result - Candidate Information", 20, yPos, 18, 12);

  // --- Candidate Details ---
  yPos += 10;
  yPos = addText("Candidate Details:", 20, yPos, 14, 10);
  yPos = addText(`Name: ${data.candidate.name}`, 20, yPos);
  yPos = addText(`Email: ${data.candidate.email}`, 20, yPos);
  yPos = addText(`Role: ${data.candidate.role}`, 20, yPos);
  yPos = addText(`Test: ${data.submission.raw.test.testName}`, 20, yPos);
  if (data.candidate.lastLogin) {
    yPos = addText(`Last Login: ${data.candidate.lastLogin}`, 20, yPos);
  }

  // --- AI Evaluation Remarks ---
  doc.addPage();
  yPos = 20;
  yPos = addText("AI Evaluation Remarks:", 20, yPos, 14, 10);
  yPos = addText(data.evaluation.overallFeedback, 20, yPos);

  // --- Questions ---
  doc.addPage();
  yPos = 20;
  yPos = addText("Test Questions and Results:", 20, yPos, 14, 10);

  data.evaluation.perQuestion.forEach((q, index) => {
    yPos = addText(`Q${index + 1}: ${q.prompt}`, 20, yPos);
    yPos = addText(`Answer: ${q.candidateAnswer}`, 20, yPos);
    yPos = addText(`Marks: ${q.awardedMarks}/${q.maxMarks}`, 20, yPos);
    yPos = addText(`Feedback: ${q.feedback}`, 20, yPos);
    yPos += 5; // small space between questions
  });

  // --- Total Marks ---
  doc.addPage();
  yPos = 20;
  yPos = addText("Total Marks and Percentage:", 20, yPos, 14, 10);
  yPos = addText(
    `Total Awarded Marks: ${data.evaluation.totalAwarded}`,
    20,
    yPos
  );
  yPos = addText(
    `Total Possible Marks: ${data.evaluation.totalPossible}`,
    20,
    yPos
  );
  yPos = addText(`Percentage: ${data.evaluation.percentage}%`, 20, yPos);

  // --- Save ---
  doc.save(`${data.candidate.name}-${data.submission.raw.test.testName}-Test-Results.pdf`);
};

export const formatQuestionType = (type) => {
  const map = {
    mcq: "Mcq",
    trueFalse: "True False",
    descriptive: "Descriptive",
  };

  return map[type] || type;
};
