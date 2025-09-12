import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTestBySlug,
  submitTest,
  uploadScreenshot,
} from "../../src/services";
import { toast } from "react-toastify";
import { normalizeQuestions } from "../../src/utils/normalizeQuestions";
import MCQQuestion from "../../src/components/question-types/MCQquestion";
import TrueFalseQuestion from "../../src/components/question-types/TrueFalseQuestion";
import DescriptiveQuestion from "../../src/components/question-types/DescriptiveQuestion";
import { proctoringStore } from "../../src/proctoring/proctoringStore";
import ProctoringFrame from "../../src/components/proctoring/ProctoringFrame";
import ProctoringOverlay from "../../src/components/proctoring/ProctoringOverlay";
import { canvasToBlob, getScaledImages } from "../../src/helpers";
import Loader from "../../src/components/common/Loader";
import useCountdown from "../../src/hooks/useCountdown";
import TimerDisplay from "../../src/components/TimerDisplay";

const AttemptTest = () => {
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const { slug } = useParams();
  const navigate = useNavigate();
  const stopShotsRef = useRef(false);
  const shotsCountRef = useRef(0);
  const isBusyRef = useRef(false);
  const intervalIdRef = useRef(null);
  const submittingRef = useRef(false);

  const MAX_SHOTS_PER_ATTEMPT = 120;

  // Guard: ensure we came from consent and have active streams
  useEffect(() => {
    const cam = proctoringStore.getWebcamStream();
    const scr = proctoringStore.getScreenStream();
    if (!cam || !scr) {
      navigate(`/consent/${slug}`, { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    // 🔑 IMPORTANT: reset guards on (re)mount — needed for React 18 StrictMode
    stopShotsRef.current = false;
    isBusyRef.current = false;
    shotsCountRef.current = 0;
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    const screen = proctoringStore.getScreenStream();
    if (!screen) {
      console.warn("[proctoring] No screen stream; not starting screenshots");
      return;
    }

    const sessionId = localStorage.getItem("proctoringSessionId") || "";
    const testSlug = localStorage.getItem("proctoringTestSlug") || "";

    // Hidden video attached to DOM (helps avoid black frames)
    const video = document.createElement("video");
    video.srcObject = screen;
    video.muted = true;
    video.playsInline = true;
    video.style.position = "fixed";
    video.style.left = "-10000px";
    video.style.top = "-10000px";
    video.setAttribute("aria-hidden", "true");
    document.body.appendChild(video);

    const track = screen.getVideoTracks()[0];
    const canGrabFrame = typeof window.ImageCapture === "function" && track;
    const grabber = canGrabFrame ? new window.ImageCapture(track) : null;

    const ensureFrameReady = async () => {
      if (video.readyState < 2) {
        await new Promise((r) => (video.onloadedmetadata = r));
      }
      try {
        await video.play();
      } catch {}
      await new Promise((r) => requestAnimationFrame(r));
    };

    const INTERVAL_MS = test?.screenShotFrequency * 1000 || 10000;

    const takeShot = async () => {
      if (stopShotsRef.current) {
        return;
      }
      if (shotsCountRef.current >= MAX_SHOTS_PER_ATTEMPT) {
        return;
      }
      if (isBusyRef.current) {
        return;
      }
      isBusyRef.current = true;

      try {
        await ensureFrameReady();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (grabber) {
          const bitmap = await grabber.grabFrame();
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          ctx.drawImage(bitmap, 0, 0);
        } else {
          const vw = video.videoWidth || 1280;
          const vh = video.videoHeight || 720;
          const { w, h } = getScaledImages(vw, vh);
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(video, 0, 0, w, h);
        }

        const blob = await canvasToBlob(canvas);
        if (!blob) {
          console.warn("[proctoring] canvasToBlob null");
          return;
        }

        const takenAt = new Date().toISOString();
        const form = new FormData();
        form.append(
          "file",
          blob,
          `shot-${takenAt}.${blob.type === "image/webp" ? "webp" : "jpg"}`
        );
        form.append("sessionId", sessionId);
        form.append("testSlug", testSlug);
        form.append("takenAt", takenAt);
        await uploadScreenshot(form);
        shotsCountRef.current += 1;
      } catch (err) {
        console.warn("[proctoring] snap/upload error:", err);
      } finally {
        isBusyRef.current = false;
      }
    };

    // one immediate shot, then every 20s
    takeShot();
    intervalIdRef.current = setInterval(takeShot, INTERVAL_MS);

    const onEnded = () => {
      stopShotsRef.current = true; // only stop due to user ending share
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
    track?.addEventListener("ended", onEnded);

    // 🔧 Cleanup: DO NOT set stopShotsRef here (StrictMode would persist it)
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      track?.removeEventListener("ended", onEnded);
      document.body.removeChild(video);
    };
  }, []);

  const fetchTest = async () => {
    try {
      const response = await getTestBySlug(slug);
      if (response) {
        const normalized = await normalizeQuestions(response.test);
        setTest(response.test);
        setQuestions(normalized);
      }
    } catch (error) {
      toast.error("Failed to fetch test");
    }
  };

  useEffect(() => {
    fetchTest();
  }, [slug]);

  const duration = Number(test?.duration) || 0;

  const { remainingMs } = useCountdown({
    duration,
    onExpire: () => handleSubmit(true),
  });

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions?.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];

  const renderQuestion = () => {
    if (!currentQuestion) return <div>Loading question...</div>;
    switch (currentQuestion?.type) {
      case "mcq":
        return (
          <MCQQuestion
            question={currentQuestion}
            answer={answers[currentQuestion._id]}
            setAnswer={(val) => handleAnswerChange(currentQuestion?._id, val)}
          />
        );
      case "trueFalse":
        return (
          <TrueFalseQuestion
            question={currentQuestion}
            answer={answers[currentQuestion._id]}
            setAnswer={(val) => handleAnswerChange(currentQuestion._id, val)}
          />
        );
      case "descriptive":
        return (
          <DescriptiveQuestion
            question={currentQuestion}
            answer={answers[currentQuestion._id]}
            setAnswer={(val) => handleAnswerChange(currentQuestion._id, val)}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (auto = false) => {
    if (loading || submittingRef.current) return;
    submittingRef.current = true;

    const payload = {
      test,
      answers,
      // optional: attach proctoring session id so backend can link screenshots later
      metadata: {
        proctoringSessionId:
          localStorage.getItem("proctoringSessionId") || null,
        autoSubmitted: !!auto,
      },
    };
    try {
      setLoading(true);
      const response = await submitTest(payload);
      if (response.status === 200 || response.status === 201) {
        toast.success(
          auto ? "Time up! Auto-submitted." : "Test submitted successfully"
        );
        setLoading(false);
        proctoringStore.stopAll();
        navigate("/my-tests");
      }
    } catch (error) {
      toast.error(error?.message || "Submission failed");
      submittingRef.current = false;
    }
  };

  return (
    // RED BORDER AROUND THE TEST AREA
    <ProctoringFrame>
      {/* WEBCAM PIP TOP-LEFT (tl|tr|bl|br) */}
      <ProctoringOverlay corner="bl" width={180} height={120} />

      <div className="min-h-[70vh] w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur shadow-[0_10px_30px_rgba(2,6,23,0.08)] dark:border-slate-800 dark:bg-slate-900/60">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
              <div className="space-y-1">
                <div className="flex gap-x-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-900/60">
                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
                    <span>Assessment</span>
                  </div>
                  <TimerDisplay remainingMs={remainingMs} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {test?.testName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Question{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {Math.min((currentStep || 0) + 1, questions?.length || 1)}
                  </span>{" "}
                  of {questions?.length || 1}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Progress
                </div>
                <div className="w-36 h-2 rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 transition-[width] duration-300 ease-out"
                    style={{
                      width: `${Math.min(
                        100,
                        (((currentStep || 0) + 1) / (questions?.length || 1)) *
                          100
                      )}%`,
                    }}
                  />
                </div>
                <div className="text-xs mt-1 font-semibold text-slate-700 dark:text-slate-200">
                  {Math.round(
                    Math.min(
                      100,
                      (((currentStep || 0) + 1) / (questions?.length || 1)) *
                        100
                    )
                  )}
                  %
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-6">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                <div className="p-4 sm:p-6">{renderQuestion()}</div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="group relative inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                        border border-slate-200 dark:border-slate-800
                        bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98]
                        dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800
                        disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous question"
                  title="Previous"
                >
                  <span className="mr-2 inline-block h-0 w-0 border-y-4 border-y-transparent border-r-8 border-r-slate-600 dark:border-r-slate-300 group-disabled:border-r-slate-400" />
                  Previous
                </button>

                {currentStep < (questions?.length || 1) - 1 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                          bg-primary text-white hover:bg-indigo-700 active:scale-[0.98] shadow
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                          dark:focus:ring-offset-slate-900"
                    aria-label="Next question"
                    title="Next"
                  >
                    Next
                    <span className="ml-2 inline-block h-0 w-0 border-y-4 border-y-transparent border-l-8 border-l-white/90" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all
                          bg-primary text-white
                          hover:brightness-110 active:scale-[0.98] shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500
                          dark:focus:ring-offset-slate-900"
                    aria-label="Submit test"
                    title="Submit Test"
                  >
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-white/90"></span>
                    {loading ? <Loader bgColor="white" /> : "Submit Test"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProctoringFrame>
  );
};

export default AttemptTest;
