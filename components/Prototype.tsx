"use client";

import { useState, useRef, useEffect } from "react";

type AppType = "claude" | null;

export default function Prototype() {
  const [activeApp, setActiveApp] = useState<AppType>(null);

  return (
    <section id="prototype" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header text from ProjectIdeas */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-text font-[family-name:var(--font-heading)] mb-4">
          Learning OS
        </h2>
        <p className="text-center text-muted mb-8 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
          Yes, buzzwordy, but I promise it means something.
        </p>
        <p className="text-center text-muted mb-12 max-w-3xl mx-auto font-[family-name:var(--font-body)] leading-relaxed">
          ~90% of school districts have adopted devices following COVID.
          Chromebooks dominated this market because they are cheap and
          minimalistic. Claude/AI can logically follow the same model, a cheap
          and scalable solution for school districts to make the most out of
          their resources. While a tightly coupled Hardware solution is
          something further down the line, implementing a simple browser-based
          &ldquo;OS&rdquo; wrapper usable on the lowest-end chromebooks can be
          an effective first step for proliferation into almost every school
          district in America. Below is the typical personalied learning
          experience most AI edtech companies are pursuing. Even if cliche it's
          fundamentally a good idea!
        </p>

        {/* Mini OS Container */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Screen area */}
          <div className="relative h-[500px] md:h-[600px] p-4">
            {/* Desktop wallpaper / background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary-light/30" />

            {/* App Windows */}
            <div className="relative h-full">
              {activeApp === null && <DesktopView />}
              {activeApp === "claude" && (
                <ClaudeApp onClose={() => setActiveApp(null)} />
              )}
            </div>
          </div>

          {/* Dock */}
          <div className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-700 px-4 py-3">
            <div className="flex justify-center gap-3">
              <DockIcon
                label="Claude"
                isActive={activeApp === "claude"}
                onClick={() => setActiveApp("claude")}
              >
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect
                    x="4"
                    y="4"
                    width="32"
                    height="32"
                    rx="8"
                    fill="#D97757"
                  />
                  <g transform="translate(8, 8) scale(0.48)">
                    {/* Claude logo - sunburst */}
                    <path
                      d="M25.5 8.3c.6 0 1.1.5 1.1 1.1v6.1c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1V9.4c0-.6.5-1.1 1.1-1.1z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M25.5 33.4c.6 0 1.1.5 1.1 1.1v6.1c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-6.1c0-.6.5-1.1 1.1-1.1z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M42.7 25.5c0 .6-.5 1.1-1.1 1.1h-6.1c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h6.1c.6 0 1.1.5 1.1 1.1z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M15.6 25.5c0 .6-.5 1.1-1.1 1.1H8.4c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h6.1c.6 0 1.1.5 1.1 1.1z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M37.6 13.4c.4.4.4 1.1 0 1.5l-4.3 4.3c-.4.4-1.1.4-1.5 0s-.4-1.1 0-1.5l4.3-4.3c.4-.4 1.1-.4 1.5 0z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M19.2 31.8c.4.4.4 1.1 0 1.5l-4.3 4.3c-.4.4-1.1.4-1.5 0s-.4-1.1 0-1.5l4.3-4.3c.4-.4 1.1-.4 1.5 0z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M37.6 37.6c-.4.4-1.1.4-1.5 0l-4.3-4.3c-.4-.4-.4-1.1 0-1.5s1.1-.4 1.5 0l4.3 4.3c.4.4.4 1.1 0 1.5z"
                      fill="#FEF4EE"
                    />
                    <path
                      d="M19.2 19.2c-.4.4-1.1.4-1.5 0l-4.3-4.3c-.4-.4-.4-1.1 0-1.5s1.1-.4 1.5 0l4.3 4.3c.4.4.4 1.1 0 1.5z"
                      fill="#FEF4EE"
                    />
                    <circle cx="25.5" cy="25.5" r="8" fill="#FEF4EE" />
                  </g>
                </svg>
              </DockIcon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Desktop view when no app is open
function DesktopView() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md">
        <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mb-3">
          Welcome to Learning OS
        </h3>
        <p className="text-white/70 font-[family-name:var(--font-body)]">
          Click the icon below to start exploring.
        </p>
      </div>
    </div>
  );
}

// Dock icon component
function DockIcon({
  children,
  label,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1"
    >
      <div
        className={`
        p-2 rounded-2xl transition-all duration-200
        ${isActive ? "bg-white/20 scale-110" : "hover:bg-white/10 hover:scale-110"}
      `}
      >
        {children}
      </div>
      <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors font-[family-name:var(--font-body)]">
        {label}
      </span>
      {isActive && <div className="w-1 h-1 rounded-full bg-white" />}
    </button>
  );
}

// Window wrapper for apps
function AppWindow({
  title,
  onClose,
  children,
  color = "bg-white",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className={`h-full ${color} rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm font-medium text-slate-600 font-[family-name:var(--font-body)]">
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

// Writing Practice Component - Letter Tracing
const LETTERS = ["A", "B", "C", "D"] as const;

interface LetterProgress {
  letter: string;
  showGuide: boolean;
  attempts: number;
  passed: boolean;
}

function WritingPractice({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<{ x: number; y: number }[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<
    { x: number; y: number }[]
  >([]);
  const [result, setResult] = useState<{ passed: boolean } | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [lessonComplete, setLessonComplete] = useState(false);

  // Track progress for each letter
  const [progress, setProgress] = useState<LetterProgress[]>(
    LETTERS.map((letter) => ({
      letter,
      showGuide: true,
      attempts: 0,
      passed: false,
    })),
  );

  const currentLetter = LETTERS[currentLetterIndex];

  // Letter path definitions for drawing the guide
  const letterPaths: {
    [key: string]: { points: { x: number; y: number }[] }[];
  } = {
    A: [
      {
        points: [
          { x: 0.5, y: 0.1 },
          { x: 0.25, y: 0.9 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.1 },
          { x: 0.75, y: 0.9 },
        ],
      },
      {
        points: [
          { x: 0.33, y: 0.55 },
          { x: 0.67, y: 0.55 },
        ],
      },
    ],
    B: [
      {
        points: [
          { x: 0.25, y: 0.1 },
          { x: 0.25, y: 0.9 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.1 },
          { x: 0.6, y: 0.1 },
          { x: 0.75, y: 0.25 },
          { x: 0.6, y: 0.5 },
          { x: 0.25, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.65, y: 0.5 },
          { x: 0.8, y: 0.7 },
          { x: 0.65, y: 0.9 },
          { x: 0.25, y: 0.9 },
        ],
      },
    ],
    C: [
      {
        points: [
          { x: 0.8, y: 0.25 },
          { x: 0.6, y: 0.1 },
          { x: 0.35, y: 0.1 },
          { x: 0.2, y: 0.3 },
          { x: 0.2, y: 0.7 },
          { x: 0.35, y: 0.9 },
          { x: 0.6, y: 0.9 },
          { x: 0.8, y: 0.75 },
        ],
      },
    ],
    D: [
      {
        points: [
          { x: 0.25, y: 0.1 },
          { x: 0.25, y: 0.9 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.1 },
          { x: 0.55, y: 0.1 },
          { x: 0.8, y: 0.3 },
          { x: 0.8, y: 0.7 },
          { x: 0.55, y: 0.9 },
          { x: 0.25, y: 0.9 },
        ],
      },
    ],
  };

  const drawLetterGuide = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    if (!showGuide) return; // Skip if guide is disabled (harder mode)

    const letter = letterPaths[currentLetter];
    if (!letter) return;

    ctx.save();
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    letter.forEach((stroke) => {
      ctx.beginPath();
      stroke.points.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    });

    ctx.restore();
  };

  const drawUserStrokes = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = "#FF6B4A";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    [...strokes, currentStroke].forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      stroke.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });

    ctx.restore();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw letter guide
    drawLetterGuide(ctx, canvas.width, canvas.height);

    // Draw user strokes
    drawUserStrokes(ctx);
  };

  useEffect(() => {
    redrawCanvas();
  }, [strokes, currentStroke, currentLetter, showGuide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        redrawCanvas();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setResult(null);
    const point = getCanvasPoint(e);
    setCurrentStroke([point]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getCanvasPoint(e);
    setCurrentStroke((prev) => [...prev, point]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  // Check accuracy using Claude Vision API
  const checkAccuracy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const allPoints = strokes.flat();
    if (allPoints.length === 0) {
      return; // Don't show result if nothing drawn
    }

    setIsChecking(true);

    try {
      // Capture canvas as base64 image
      const imageData = canvas.toDataURL("image/png");
      const base64 = imageData.replace("data:image/png;base64,", "");

      console.log(
        "[WritingPractice] Sending request to API, image size:",
        base64.length,
      );

      // Call API
      const response = await fetch("/api/check-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, letter: currentLetter }),
      });

      const data = await response.json();
      console.log("[WritingPractice] API response:", response.status, data);

      if (!response.ok) {
        console.error("[WritingPractice] API error:", data.error);
        setResult({ passed: false });
        return;
      }

      setResult({ passed: data.passed });
    } catch (error) {
      console.error("[WritingPractice] Error checking writing:", error);
      setResult({ passed: false });
    } finally {
      setIsChecking(false);
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setResult(null);
  };

  const handleNextLetter = () => {
    // Update progress for current letter
    setProgress((prev) =>
      prev.map((p, i) =>
        i === currentLetterIndex ? { ...p, passed: true } : p,
      ),
    );

    // Move to next letter
    if (currentLetterIndex < LETTERS.length - 1) {
      const nextIndex = currentLetterIndex + 1;
      setCurrentLetterIndex(nextIndex);
      // Start next letter WITHOUT guide (harder mode since they passed previous)
      setShowGuide(false);
      clearCanvas();
    } else {
      // Completed all letters!
      setLessonComplete(true);
    }
  };

  const handleRetry = () => {
    // Update attempts
    setProgress((prev) =>
      prev.map((p, i) =>
        i === currentLetterIndex ? { ...p, attempts: p.attempts + 1 } : p,
      ),
    );

    // If they failed without guide, show the guide for next attempt
    if (!showGuide) {
      setShowGuide(true);
    }

    clearCanvas();
  };

  const restartLesson = () => {
    setCurrentLetterIndex(0);
    setShowGuide(true);
    setLessonComplete(false);
    setProgress(
      LETTERS.map((letter) => ({
        letter,
        showGuide: true,
        attempts: 0,
        passed: false,
      })),
    );
    clearCanvas();
  };

  // Lesson complete screen
  if (lessonComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Lesson Complete!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-6">
            You&apos;ve practiced all the letters A - D. Great work!
          </p>

          {/* Progress summary */}
          <div className="flex justify-center gap-3 mb-6">
            {progress.map((p) => (
              <div key={p.letter} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                    p.passed
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {p.letter}
                </div>
                <span className="text-xs text-slate-400 mt-1">
                  {p.passed ? "✓" : "-"}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onComplete || restartLesson}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            {onComplete ? "Next Module" : "Practice Again"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header with instructions */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <p className="text-sm text-slate-500 font-[family-name:var(--font-body)] mb-1">
          Today we are practicing writing letters A - D uppercase
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)]">
              Write the letter &quot;{currentLetter}&quot;
            </span>
            {!showGuide && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                Challenge Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-[family-name:var(--font-body)]"
            >
              Clear
            </button>
            <button
              onClick={checkAccuracy}
              disabled={isChecking}
              className="px-3 py-1.5 text-sm rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors font-[family-name:var(--font-body)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? "Checking..." : "Check"}
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 mt-3">
          {LETTERS.map((letter, index) => (
            <div
              key={letter}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                index === currentLetterIndex
                  ? "bg-primary text-white scale-110"
                  : progress[index].passed
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative p-4">
        <div className="absolute inset-4 bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        {/* Result Overlay */}
        {result && (
          <div className="absolute inset-4 flex items-center justify-center bg-black/20 rounded-2xl">
            <div
              className={`bg-white rounded-2xl p-6 shadow-xl text-center max-w-xs ${result.passed ? "border-4 border-green-400" : "border-4 border-amber-400"}`}
            >
              <div className="text-5xl mb-4">{result.passed ? "🎉" : "🤔"}</div>
              <h3
                className={`text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 ${result.passed ? "text-green-600" : "text-amber-600"}`}
              >
                {result.passed ? "Great Job!" : "Not Quite"}
              </h3>
              <button
                onClick={result.passed ? handleNextLetter : handleRetry}
                className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
              >
                {result.passed
                  ? currentLetterIndex < LETTERS.length - 1
                    ? "Next Letter"
                    : "Finish!"
                  : "Try Again"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer instructions */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <p className="text-sm text-slate-500 text-center font-[family-name:var(--font-body)]">
          {showGuide
            ? "Trace the letter following the dotted lines"
            : "Challenge: Write the letter from memory!"}
        </p>
      </div>
    </div>
  );
}

// Reading Practice Component - Voice-prompted reading companion (Press-to-speak per word)
const READING_SENTENCES = ["The cat sat.", "I see a dog."];

type ReadingState =
  | "idle"
  | "recording"
  | "checking"
  | "correct"
  | "hint1"
  | "hint2";

function ReadingPractice({ onComplete }: { onComplete?: () => void }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [state, setState] = useState<ReadingState>("idle");
  const [isComplete, setIsComplete] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  const [lastSpoken, setLastSpoken] = useState("");
  const [attempts, setAttempts] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const currentSentence = READING_SENTENCES[currentSentenceIndex];
  const words = currentSentence.split(" ");
  const currentTargetWord = words[currentWordIndex];
  const cleanTargetWord = currentTargetWord.replace(/[.,!?]/g, "");

  // Local phonetic hints - always available, no API dependency
  const PHONETIC_HINTS: { [key: string]: string } = {
    "the": "thuh",
    "cat": "kuh - aah - tuh",
    "sat": "sss - aah - tuh",
    "i": "eye",
    "see": "sss - eee",
    "a": "uh",
    "dog": "duh - aww - guh",
  };
  const localPhoneticHint = PHONETIC_HINTS[cleanTargetWord.toLowerCase()] || cleanTargetWord;

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognitionAPI =
      (window as Window).SpeechRecognition ||
      (window as Window).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setBrowserSupported(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-to-Speech: Speak a word (slow and clear for kids)
  const speakWord = (word: string, slow: boolean = false) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        word.replace(/[.,!?]/g, ""),
      );
      utterance.rate = slow ? 0.6 : 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Check if spoken word matches target using Claude API
  // Check if spoken word matches target using Claude API
  const checkWordMatch = async (
    spokenText: string,
    targetWord: string,
  ): Promise<{ matched: boolean }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch("/api/check-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spokenText, targetWord, needHint: true }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      return { matched: data.matched };
    } catch (err) {
      console.error("[ReadingPractice] API error:", err);
      // Fallback to simple local matching on error
      const normalizedSpoken = spokenText.toLowerCase().trim();
      const normalizedTarget = targetWord.toLowerCase().replace(/[.,!?]/g, "").trim();
      const spokenWords = normalizedSpoken.split(/\s+/);
      const matched = spokenWords.includes(normalizedTarget);
      return { matched };
    }
  };

  // Handle moving to next word or sentence
  const advanceToNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else if (currentSentenceIndex < READING_SENTENCES.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setCurrentWordIndex(0);
    } else {
      setIsComplete(true);
    }
    setState("idle");
    setLastSpoken("");
    setAttempts(0);
  };

  // Start recording for ONE word
  const startRecording = () => {
    const SpeechRecognitionAPI =
      (window as Window).SpeechRecognition ||
      (window as Window).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setBrowserSupported(false);
      return;
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    setState("recording");
    setLastSpoken("");

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    let hasResult = false;

    // Timeout to prevent hanging - stop after 8 seconds
    const timeout = setTimeout(() => {
      if (recognitionRef.current && !hasResult) {
        console.log("[ReadingPractice] Timeout - stopping recognition");
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    }, 8000);

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      hasResult = true;
      clearTimeout(timeout);
      const transcript = event.results[0][0].transcript.trim();
      setLastSpoken(transcript);
      setState("checking");

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      const result = await checkWordMatch(transcript, currentTargetWord);

      if (result.matched) {
        setState("correct");
        setTimeout(() => advanceToNext(), 800);
      } else {
        // First wrong = show phonetic hint, second wrong = show audio hint
        if (newAttempts === 1) {
          setState("hint1");
        } else {
          setState("hint2");
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      clearTimeout(timeout);
      console.log("[ReadingPractice] Error:", event.error);
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setBrowserSupported(false);
      } else if (event.error === "no-speech") {
        setState("idle");
        setLastSpoken("(No speech detected)");
      } else {
        setState("idle");
      }
    };

    recognition.onend = () => {
      clearTimeout(timeout);
      recognitionRef.current = null;
      // If no result was received, reset to idle state
      if (!hasResult) {
        setState("idle");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Play the word using TTS
  const playWordAudio = () => {
    speakWord(cleanTargetWord, true);
  };

  // Browser not supported view
  if (!browserSupported) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-16 h-16 mx-auto text-slate-400"
            >
              <path
                d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5M12 19v3M8 22h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 4l16 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Microphone Not Available
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-4 text-sm">
            Please use Chrome or Edge and allow microphone access.
          </p>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            Skip to Next Module
          </button>
        </div>
      </div>
    );
  }

  // Lesson complete view
  if (isComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-16 h-16 mx-auto text-green-500"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12l2.5 2.5L16 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Great Reading!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-4">
            You read all {READING_SENTENCES.length} sentences!
          </p>

          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {READING_SENTENCES.map((_, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>

          <button
            onClick={onComplete}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            Next Module
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-700 font-[family-name:var(--font-heading)]">
            Sentence {currentSentenceIndex + 1} of {READING_SENTENCES.length}
          </span>
          <span className="text-xs text-slate-400 font-[family-name:var(--font-body)]">
            Tap word to hear it
          </span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {READING_SENTENCES.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index < currentSentenceIndex
                  ? "bg-green-400"
                  : index === currentSentenceIndex
                    ? "bg-primary scale-125"
                    : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
        {/* Sentence display */}
        <div className="bg-white rounded-2xl p-5 shadow-lg max-w-md w-full mb-4">
          <div className="flex flex-wrap justify-center gap-2 text-2xl font-bold font-[family-name:var(--font-heading)]">
            {words.map((word, index) => (
              <button
                key={index}
                onClick={() => speakWord(word)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer hover:scale-105 ${
                  index < currentWordIndex
                    ? "bg-green-100 text-green-600"
                    : index === currentWordIndex
                      ? "bg-primary text-white scale-105 shadow-md"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Action area - changes based on state */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          {state === "idle" && (
            <>
              <p className="text-slate-600 font-[family-name:var(--font-body)] text-center mb-2">
                Say the word: <strong>&quot;{cleanTargetWord}&quot;</strong>
              </p>
              <button
                onClick={startRecording}
                className="w-full px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all font-[family-name:var(--font-body)] text-lg font-bold shadow-lg hover:scale-105 flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5M12 19v3M8 22h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Press &amp; Speak
              </button>
            </>
          )}

          {state === "recording" && (
            <>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-7 h-7 text-white"
                    >
                      <path
                        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                        fill="currentColor"
                      />
                      <path
                        d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5M12 19v3M8 22h8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
              </div>
              <p className="text-red-600 font-[family-name:var(--font-body)] font-bold animate-pulse">
                Listening...
              </p>
            </>
          )}

          {state === "checking" && (
            <>
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-blue-600 font-[family-name:var(--font-body)]">
                Checking...
              </p>
            </>
          )}

          {state === "correct" && (
            <>
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10 text-green-500"
                >
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-green-600 font-[family-name:var(--font-body)] font-bold text-lg">
                Correct!
              </p>
            </>
          )}

          {state === "hint1" && (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-8 h-8 text-amber-500"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-amber-600 font-[family-name:var(--font-body)] font-bold">
                Almost! Try sounding it out:
              </p>
              {/* Phonetic hint */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 w-full text-center">
                <p className="text-2xl font-bold text-amber-700 font-[family-name:var(--font-heading)]">
                  {localPhoneticHint}
                </p>
              </div>
              {lastSpoken && (
                <p className="text-xs text-slate-400 font-[family-name:var(--font-body)]">
                  You said: &quot;{lastSpoken}&quot;
                </p>
              )}
              <button
                onClick={startRecording}
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-[family-name:var(--font-body)] font-bold flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5M12 19v3M8 22h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Try Again
              </button>
            </>
          )}

          {state === "hint2" && (
            <>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-8 h-8 text-blue-500"
                >
                  <path
                    d="M11 5L6 9H2v6h4l5 4V5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-blue-600 font-[family-name:var(--font-body)] font-bold">
                Listen and repeat:
              </p>
              {/* Audio play button */}
              <button
                onClick={playWordAudio}
                className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-[family-name:var(--font-body)] font-bold flex items-center justify-center gap-3 text-lg"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                </svg>
                Hear &quot;{cleanTargetWord}&quot;
              </button>
              {/* Phonetic hint still shown */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 w-full text-center">
                <p className="text-sm text-slate-500 font-[family-name:var(--font-body)]">
                  {localPhoneticHint}
                </p>
              </div>
              <button
                onClick={startRecording}
                className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)] font-bold flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5M12 19v3M8 22h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-400 text-center font-[family-name:var(--font-body)]">
          Word {currentWordIndex + 1} of {words.length}
        </p>
      </div>
    </div>
  );
}

// ===========================================
// MATH PRACTICE COMPONENT
// ===========================================

type MathProblemType = "counting" | "wordProblem1" | "wordProblem2";
type MathState = "intro" | "active" | "correct" | "incorrect" | "checking";
type WordProblemStep = "sallyDraw" | "johnDraw";

// Ball colors for counting problem
const BALL_COLORS = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
];

function MathPractice({ onComplete }: { onComplete?: () => void }) {
  const [currentProblem, setCurrentProblem] =
    useState<MathProblemType>("counting");
  const [state, setState] = useState<MathState>("intro");
  const [isModuleComplete, setIsModuleComplete] = useState(false);

  // Problem 1: Counting state
  const [ballCount, setBallCount] = useState(0);
  const [ballPositions, setBallPositions] = useState<
    { x: number; y: number; color: string }[]
  >([]);
  const [countingAnswer, setCountingAnswer] = useState("");
  const [countingHint, setCountingHint] = useState<string | null>(null);

  // Word Problem state (Problems 2 & 3)
  const [sallyBalls, setSallyBalls] = useState(3);
  const [johnBalls, setJohnBalls] = useState(5);
  const [wordProblemStep, setWordProblemStep] =
    useState<WordProblemStep>("sallyDraw");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Problem 3: Subtraction answer state
  const [subtractionAnswer, setSubtractionAnswer] = useState("");
  const [subtractionHint, setSubtractionHint] = useState<string | null>(null);

  // Initialize first problem
  useEffect(() => {
    if (currentProblem === "counting" && ballCount === 0) {
      generateCountingProblem();
    }
  }, [currentProblem, ballCount]);

  // Generate random ball positions for counting
  const generateCountingProblem = () => {
    const count = Math.floor(Math.random() * 5) + 2; // 2-6 balls
    const positions: { x: number; y: number; color: string }[] = [];

    for (let i = 0; i < count; i++) {
      // Generate position that doesn't overlap too much
      let x: number = 0;
      let y: number = 0;
      let attempts = 0;
      do {
        x = Math.random() * 70 + 15; // 15-85%
        y = Math.random() * 60 + 20; // 20-80%
        attempts++;
      } while (
        attempts < 20 &&
        positions.some((p) => Math.abs(p.x - x) < 15 && Math.abs(p.y - y) < 15)
      );

      positions.push({
        x,
        y,
        color: BALL_COLORS[i % BALL_COLORS.length],
      });
    }

    setBallCount(count);
    setBallPositions(positions);
    setCountingAnswer("");
    setCountingHint(null);
    setState("active");
  };

  // Initialize word problem 1 (Sally has 3, John has 5)
  const initWordProblem1 = () => {
    setSallyBalls(3);
    setJohnBalls(5);
    setWordProblemStep("sallyDraw");
    setHasDrawn(false);
    setState("active");
    clearCanvas();
  };

  // Initialize word problem 2 (Sally takes 1, how many does John have?)
  const initWordProblem2 = () => {
    // Reset for subtraction problem
    setSubtractionAnswer("");
    setSubtractionHint(null);
    setState("active");
  };

  // Check counting answer
  const checkCountingAnswer = () => {
    const answer = parseInt(countingAnswer);
    if (answer === ballCount) {
      setState("correct");
      setTimeout(() => {
        setCurrentProblem("wordProblem1");
        initWordProblem1();
      }, 1200);
    } else {
      setState("incorrect");
      setCountingHint(
        `You said ${answer}, but there are ${ballCount} balls. Try counting again!`,
      );
      setTimeout(() => setState("active"), 100);
    }
  };

  // Check subtraction answer (Problem 3)
  const checkSubtractionAnswer = () => {
    const answer = parseInt(subtractionAnswer);
    const correctAnswer = johnBalls - 1; // 5 - 1 = 4
    if (answer === correctAnswer) {
      setState("correct");
      setTimeout(() => {
        setIsModuleComplete(true);
      }, 1200);
    } else {
      setSubtractionHint(
        `Not quite! If John has ${johnBalls} balls and Sally takes 1, how many are left?`,
      );
    }
  };

  // Canvas drawing handlers
  const getCanvasCoords = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#FF6B4A";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if ("touches" in e) {
      e.preventDefault();
    }

    const { x, y } = getCanvasCoords(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Check word problem drawing with Claude Vision API
  const checkWordProblemDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setState("checking");

    // Determine expected count based on current problem and step
    let expectedCount: number;
    let personName: string;

    if (currentProblem === "wordProblem1") {
      if (wordProblemStep === "sallyDraw") {
        expectedCount = sallyBalls; // 3
        personName = "Sally";
      } else {
        expectedCount = johnBalls; // 5
        personName = "John";
      }
    } else {
      // wordProblem2: After Sally takes 1, John has 4
      expectedCount = johnBalls - 1; // 4
      personName = "John";
    }

    try {
      // Get canvas as base64
      const imageData = canvas.toDataURL("image/png").split(",")[1];

      const response = await fetch("/api/check-math-balls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageData,
          expectedCount,
          personName,
        }),
      });

      const data = await response.json();

      if (data.passed) {
        setState("correct");
        setTimeout(() => {
          // Progress to next step
          if (currentProblem === "wordProblem1") {
            if (wordProblemStep === "sallyDraw") {
              // Move to John's turn
              setWordProblemStep("johnDraw");
              setHasDrawn(false);
              setState("active");
              clearCanvas();
            } else {
              // Done with problem 1, move to problem 2
              setCurrentProblem("wordProblem2");
              initWordProblem2();
            }
          } else {
            // Done with all problems!
            setIsModuleComplete(true);
          }
        }, 1200);
      } else {
        setState("incorrect");
        setTimeout(() => {
          setState("active");
        }, 1500);
      }
    } catch (err) {
      console.error("[MathPractice] Ball check error:", err);
      // On error, be lenient and pass them
      setState("correct");
      setTimeout(() => {
        if (currentProblem === "wordProblem1") {
          if (wordProblemStep === "sallyDraw") {
            setWordProblemStep("johnDraw");
            setHasDrawn(false);
            setState("active");
            clearCanvas();
          } else {
            setCurrentProblem("wordProblem2");
            initWordProblem2();
          }
        } else {
          setIsModuleComplete(true);
        }
      }, 1200);
    }
  };

  // Module complete view
  if (isModuleComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">🧮</div>
          <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Great Math Work!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-4">
            You completed all 3 math problems!
          </p>

          <div className="flex justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              🔢
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              👧
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              👦
            </div>
          </div>

          <button
            onClick={onComplete}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            Next Module
          </button>
        </div>
      </div>
    );
  }

  // Intro view
  if (state === "intro") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Math Time!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-4">
            Let&apos;s count and solve word problems!
          </p>

          <button
            onClick={() => {
              generateCountingProblem();
            }}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            Start Math
          </button>
        </div>
      </div>
    );
  }

  // Problem 1: Counting
  if (currentProblem === "counting") {
    return (
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Header */}
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700 font-[family-name:var(--font-heading)]">
              Problem 1 of 3: Counting
            </span>
            <span className="text-2xl">🔢</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary scale-125" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Ball area */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-lg h-full relative overflow-hidden">
            <p className="absolute top-3 left-0 right-0 text-center text-lg font-bold text-slate-700 font-[family-name:var(--font-heading)]">
              How many balls do you see?
            </p>

            {/* Balls */}
            {ballPositions.map((ball, index) => (
              <div
                key={index}
                className={`absolute w-12 h-12 rounded-full ${ball.color} shadow-lg transform hover:scale-110 transition-transform`}
                style={{
                  left: `${ball.x}%`,
                  top: `${ball.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Answer area */}
        <div className="p-4 border-t border-slate-200 bg-white">
          {state === "correct" ? (
            <div className="flex items-center justify-center gap-3 py-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-green-500"
                >
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-green-600 font-[family-name:var(--font-heading)]">
                Correct! {ballCount} balls!
              </span>
            </div>
          ) : (
            <>
              {countingHint && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-[family-name:var(--font-body)]">
                  {countingHint}
                </div>
              )}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={countingAnswer}
                  onChange={(e) => setCountingAnswer(e.target.value)}
                  placeholder="?"
                  className="w-20 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none font-[family-name:var(--font-heading)]"
                />
                <button
                  onClick={checkCountingAnswer}
                  disabled={!countingAnswer}
                  className="flex-1 h-14 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)] font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Problem 2: Word Problem - Sally has 3, John has 5
  if (currentProblem === "wordProblem1") {
    const currentPerson = wordProblemStep === "sallyDraw" ? "Sally" : "John";
    const currentCount =
      wordProblemStep === "sallyDraw" ? sallyBalls : johnBalls;
    const personEmoji = wordProblemStep === "sallyDraw" ? "👧" : "👦";

    return (
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Compact Header with story */}
        <div className="p-2 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-[family-name:var(--font-body)]">
                Problem 2/3
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-slate-200" />
              </div>
            </div>
            <span className="text-2xl">{personEmoji}</span>
          </div>
          <p className="text-center text-sm text-slate-600 font-[family-name:var(--font-body)]">
            <span className="font-bold">Sally</span>:{" "}
            <span className="text-pink-500 font-bold">{sallyBalls}</span> balls
            | <span className="font-bold">John</span>:{" "}
            <span className="text-blue-500 font-bold">{johnBalls}</span> balls
          </p>
        </div>

        {/* Instruction bar */}
        <div className="bg-blue-50 px-3 py-2 flex items-center justify-center gap-2">
          <span className="text-3xl">{personEmoji}</span>
          <p className="text-base font-bold text-slate-700 font-[family-name:var(--font-heading)]">
            Draw <span className="text-primary text-xl">{currentCount}</span>{" "}
            balls for {currentPerson}!
          </p>
        </div>

        {/* Drawing canvas - takes remaining space */}
        <div className="flex-1 p-2 min-h-0">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden relative h-full">
            <canvas
              ref={canvasRef}
              width={300}
              height={150}
              className="w-full h-full touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />

            {/* Checking overlay */}
            {state === "checking" && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Correct overlay */}
            {state === "correct" && (
              <div className="absolute inset-0 bg-green-50/90 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-12 h-12 text-green-500 mx-auto"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-lg font-bold text-green-600 font-[family-name:var(--font-heading)]">
                    Great!
                  </p>
                </div>
              </div>
            )}

            {/* Incorrect overlay */}
            {state === "incorrect" && (
              <div className="absolute inset-0 bg-amber-50/90 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-12 h-12 text-amber-500 mx-auto"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8v4M12 16h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-base font-bold text-amber-600 font-[family-name:var(--font-heading)]">
                    Try again!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact action buttons */}
        <div className="p-2 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="px-3 h-10 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-[family-name:var(--font-body)] font-bold text-sm"
            >
              Clear
            </button>
            <button
              onClick={checkWordProblemDrawing}
              disabled={!hasDrawn || state === "checking"}
              className="flex-1 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "checking" ? "Checking..." : "Check Drawing"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Problem 3: Word Problem - Sally takes 1 ball, how many does John have?
  if (currentProblem === "wordProblem2") {
    const expectedAnswer = johnBalls - 1; // 5 - 1 = 4

    return (
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Compact Header */}
        <div className="p-2 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-[family-name:var(--font-body)]">
                Problem 3/3
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Story illustration */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
            {/* Visual representation */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <span className="text-4xl">&#x1F466;</span>
                <p className="text-sm font-bold text-slate-600 font-[family-name:var(--font-body)]">
                  John
                </p>
              </div>
              <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
                {Array.from({ length: johnBalls }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${i === johnBalls - 1 ? "bg-pink-300 border-2 border-dashed border-pink-400" : "bg-blue-400"} shadow`}
                  />
                ))}
              </div>
            </div>

            {/* Story text */}
            <div className="bg-purple-50 rounded-xl p-3 mb-4">
              <p className="text-center text-slate-700 font-[family-name:var(--font-body)]">
                John had{" "}
                <span className="text-blue-500 font-bold text-lg">
                  {johnBalls}
                </span>{" "}
                balls.
              </p>
              <p className="text-center text-slate-700 font-[family-name:var(--font-body)]">
                Sally takes{" "}
                <span className="text-pink-500 font-bold text-lg">1</span> ball.
              </p>
            </div>

            {/* Question */}
            <p className="text-center text-lg font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-4">
              How many does John have now?
            </p>

            {/* Answer display for correct/incorrect states */}
            {state === "correct" ? (
              <div className="flex items-center justify-center gap-3 py-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-green-500"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-green-600 font-[family-name:var(--font-heading)]">
                  {johnBalls} - 1 = {expectedAnswer}
                </span>
              </div>
            ) : (
              <>
                {/* Equation with input */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-slate-700 font-[family-name:var(--font-heading)]">
                    {johnBalls}
                  </span>
                  <span className="text-3xl font-bold text-slate-400">-</span>
                  <span className="text-3xl font-bold text-pink-500 font-[family-name:var(--font-heading)]">
                    1
                  </span>
                  <span className="text-3xl font-bold text-slate-400">=</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={subtractionAnswer}
                    onChange={(e) => setSubtractionAnswer(e.target.value)}
                    placeholder="?"
                    className="w-16 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none font-[family-name:var(--font-heading)]"
                  />
                </div>

                {subtractionHint && (
                  <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-[family-name:var(--font-body)] text-center">
                    {subtractionHint}
                  </div>
                )}

                <button
                  onClick={checkSubtractionAnswer}
                  disabled={!subtractionAnswer}
                  className="w-full h-12 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)] font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ===========================================
// SCIENCE PRACTICE COMPONENT
// ===========================================

type ScienceState = "intro" | "active" | "checking" | "correct" | "incorrect";
type ScienceQuestion = "fish" | "mountain";

// Science questions data
const SCIENCE_QUESTIONS = {
  fish: {
    question: "Where does a fish live?",
    emoji: "&#x1F41F;",
    expectedAnswer: "water, ocean, sea, lake, river, pond, aquarium",
    successMessage: "Fish live in water!",
    successEmojis: "&#x1F41F; &#x1F30A; &#x1F41F;",
    defaultHint: "Try drawing some water for the fish!",
  },
  mountain: {
    question: "What does a mountain look like?",
    emoji: "&#x26F0;",
    expectedAnswer:
      "triangle shape, peak, tall, rocky, snow on top, trees, hills",
    successMessage: "Mountains are tall and pointy!",
    successEmojis: "&#x26F0;&#xFE0F; &#x1F3D4;&#xFE0F; &#x26F0;&#xFE0F;",
    defaultHint: "Try drawing a tall pointy shape like a triangle!",
  },
};

// Color palette for drawing
const DRAWING_COLORS = [
  { name: "Blue", hex: "#3B82F6", bg: "bg-blue-500" },
  { name: "Light Blue", hex: "#7DD3FC", bg: "bg-sky-300" },
  { name: "Green", hex: "#22C55E", bg: "bg-green-500" },
  { name: "Brown", hex: "#A16207", bg: "bg-yellow-700" },
  { name: "Yellow", hex: "#FACC15", bg: "bg-yellow-400" },
  { name: "Orange", hex: "#F97316", bg: "bg-orange-500" },
  { name: "Red", hex: "#EF4444", bg: "bg-red-500" },
  { name: "White", hex: "#FFFFFF", bg: "bg-white border border-slate-300" },
];

function SciencePractice({ onComplete }: { onComplete?: () => void }) {
  const [state, setState] = useState<ScienceState>("intro");
  const [currentQuestion, setCurrentQuestion] =
    useState<ScienceQuestion>("fish");
  const [selectedColor, setSelectedColor] = useState(DRAWING_COLORS[0].hex);
  const [isEraser, setIsEraser] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const questionData = SCIENCE_QUESTIONS[currentQuestion];

  // Initialize canvas with white background
  useEffect(() => {
    if (state === "active") {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
      }, 100);
    }
  }, [state]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Canvas drawing handlers
  const getCanvasCoords = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? "#FFFFFF" : selectedColor;
    ctx.lineWidth = isEraser ? 20 : 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if ("touches" in e) {
      e.preventDefault();
    }

    const { x, y } = getCanvasCoords(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Move to next question or complete
  const goToNextQuestion = () => {
    if (currentQuestion === "fish") {
      // Move to mountain question
      setCurrentQuestion("mountain");
      setHasDrawn(false);
      setFeedback(null);
      setState("active");
      // Clear canvas for next question
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
      }, 100);
    } else {
      // All done!
      onComplete?.();
    }
  };

  // Check drawing with Claude Vision API
  const checkDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setState("checking");
    setFeedback(null);

    try {
      const imageData = canvas.toDataURL("image/png").split(",")[1];

      const response = await fetch("/api/check-science", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageData,
          question: questionData.question,
          expectedAnswer: questionData.expectedAnswer,
          questionType: currentQuestion,
        }),
      });

      const data = await response.json();

      if (data.passed) {
        setState("correct");
      } else {
        setState("incorrect");
        setFeedback(data.feedback || questionData.defaultHint);
      }
    } catch (err) {
      console.error("[SciencePractice] Check error:", err);
      // On error, be lenient
      setState("correct");
    }
  };

  // Intro view
  if (state === "intro") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">&#x1F52C;</div>
          <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Science Time!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-4">
            Let&apos;s learn about nature by drawing!
          </p>

          <button
            onClick={() => setState("active")}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            Start Science
          </button>
        </div>
      </div>
    );
  }

  // Correct view
  if (state === "correct") {
    const isLastQuestion = currentQuestion === "mountain";

    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">&#x1F3C6;</div>
          <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            Great Job!
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-2">
            You&apos;re right! {questionData.successMessage}
          </p>
          <p
            className="text-slate-500 font-[family-name:var(--font-body)] mb-4 text-2xl"
            dangerouslySetInnerHTML={{ __html: questionData.successEmojis }}
          />

          <button
            onClick={goToNextQuestion}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            {isLastQuestion ? "Finish Science" : "Next Question"}
          </button>
        </div>
      </div>
    );
  }

  // Main drawing view
  const questionNumber = currentQuestion === "fish" ? 1 : 2;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      {/* Compact Header */}
      <div className="p-2 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-[family-name:var(--font-body)]">
              Question {questionNumber}/2
            </span>
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${currentQuestion === "fish" ? "bg-primary" : "bg-green-400"}`}
              />
              <div
                className={`w-2 h-2 rounded-full ${currentQuestion === "mountain" ? "bg-primary" : "bg-slate-200"}`}
              />
            </div>
          </div>
          <span className="text-2xl">&#x1F52C;</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-green-50 px-3 py-2 flex items-center justify-center gap-2">
        <span
          className="text-3xl"
          dangerouslySetInnerHTML={{ __html: questionData.emoji }}
        />
        <p className="text-base font-bold text-slate-700 font-[family-name:var(--font-heading)]">
          {questionData.question} Draw it!
        </p>
      </div>

      {/* Color palette */}
      <div className="bg-white px-2 py-1.5 border-b border-slate-200 flex items-center gap-1 justify-center">
        {DRAWING_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => {
              setSelectedColor(color.hex);
              setIsEraser(false);
            }}
            className={`w-7 h-7 rounded-full ${color.bg} ${
              selectedColor === color.hex && !isEraser
                ? "ring-2 ring-offset-1 ring-slate-400 scale-110"
                : ""
            } transition-transform`}
            title={color.name}
          />
        ))}
        {/* Eraser */}
        <button
          onClick={() => setIsEraser(true)}
          className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center ${
            isEraser ? "ring-2 ring-offset-1 ring-slate-400 scale-110" : ""
          } transition-transform ml-1`}
          title="Eraser"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 text-slate-500"
          >
            <path
              d="M20 20H7L3 16l9-9 8 8-4 4v1h4v0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Drawing canvas */}
      <div className="flex-1 p-2 min-h-0">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative h-full border-2 border-slate-200">
          <canvas
            ref={canvasRef}
            width={300}
            height={180}
            className="w-full h-full touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Checking overlay */}
          {state === "checking" && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Incorrect overlay */}
          {state === "incorrect" && (
            <div className="absolute inset-0 bg-amber-50/90 flex items-center justify-center p-4">
              <div className="text-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10 text-amber-500 mx-auto mb-2"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-sm font-bold text-amber-700 font-[family-name:var(--font-body)]">
                  {feedback}
                </p>
                <button
                  onClick={() => setState("active")}
                  className="mt-2 px-4 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-bold"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-2 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={clearCanvas}
            className="px-3 h-10 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-[family-name:var(--font-body)] font-bold text-sm"
          >
            Clear
          </button>
          <button
            onClick={checkDrawing}
            disabled={!hasDrawn || state === "checking"}
            className="flex-1 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "checking" ? "Checking..." : "Check Drawing"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Generic Subject Practice Component for Reading, Math, Science
function SubjectPractice({
  subject,
  icon,
  title,
  onComplete,
  isFinalModule = false,
}: {
  subject: string;
  icon: string;
  title: string;
  onComplete?: () => void;
  isFinalModule?: boolean;
}) {
  const [isComplete, setIsComplete] = useState(false);

  // Simulate completing the module (in a real app, this would have actual content)
  const handleComplete = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">{isFinalModule ? "🎊" : "🏆"}</div>
          <h2 className="text-3xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
            {isFinalModule ? "All Done for Today!" : `${title} Complete!`}
          </h2>
          <p className="text-slate-500 font-[family-name:var(--font-body)] mb-6">
            {isFinalModule
              ? "You finished all your lessons. Great job!"
              : `You finished ${title}. Keep up the great work!`}
          </p>

          <button
            onClick={onComplete}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
          >
            {isFinalModule ? "Back to Today" : "Next Module"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-8">
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-slate-700 font-[family-name:var(--font-heading)] mb-2">
          {title}
        </h2>
        <p className="text-slate-500 font-[family-name:var(--font-body)] mb-6">
          {subject === "reading" && "Let's read a fun story together!"}
          {subject === "math" && "Let's count and solve puzzles!"}
          {subject === "science" && "Let's explore and discover!"}
        </p>

        <button
          onClick={handleComplete}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
        >
          Start Lesson
        </button>
      </div>
    </div>
  );
}

// Subject type for classroom
type Subject = "writing" | "reading" | "math" | "science" | null;

interface LessonPlan {
  subject: Subject;
  title: string;
  icon: string;
  color: string;
  description: string;
}

// Sidebar tab type
type SidebarTab = "today";

// Claude Classroom App - Simplified for kindergarteners
function ClaudeApp({ onClose }: { onClose: () => void }) {
  const [activeSubject, setActiveSubject] = useState<Subject>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>("today");

  const todaysLessons: LessonPlan[] = [
    {
      subject: "writing",
      title: "Writing",
      icon: "✏️",
      color: "bg-amber-100 text-amber-700 border-amber-200",
      description: "Practice your letters",
    },
    {
      subject: "reading",
      title: "Reading",
      icon: "📖",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      description: "Story time",
    },
    {
      subject: "math",
      title: "Math",
      icon: "🔢",
      color: "bg-green-100 text-green-700 border-green-200",
      description: "Counting fun",
    },
    {
      subject: "science",
      title: "Science",
      icon: "🔬",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      description: "Explore nature",
    },
  ];

  const sidebarTabs: { id: SidebarTab; label: string; icon: string }[] = [
    { id: "today", label: "Today", icon: "📅" },
  ];

  const currentLesson = todaysLessons.find((l) => l.subject === activeSubject);

  return (
    <AppWindow title="My Classroom" onClose={onClose}>
      <div className="h-full flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-48" : "w-0"} transition-all duration-300 overflow-hidden border-r border-slate-200 bg-slate-50 flex flex-col`}
        >
          <div className="p-2 space-y-1">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveSubject(null);
                }}
                className={`w-full px-3 py-3 rounded-xl text-left text-sm font-medium transition-colors font-[family-name:var(--font-body)] flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar toggle */}
          <div className="flex items-center gap-3 p-3 border-b border-slate-200 bg-white">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-xl transition-colors ${sidebarOpen ? "bg-primary text-white" : "hover:bg-slate-100 text-slate-600"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {activeSubject ? (
              <>
                <button
                  onClick={() => setActiveSubject(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-slate-600"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="text-xl">{currentLesson?.icon}</span>
                <span className="text-lg font-bold text-slate-700 font-[family-name:var(--font-heading)]">
                  {currentLesson?.title}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-700 font-[family-name:var(--font-heading)]">
                {sidebarTabs.find((t) => t.id === activeTab)?.icon}{" "}
                {sidebarTabs.find((t) => t.id === activeTab)?.label}
              </span>
            )}
          </div>

          {/* Content Area */}
          {activeSubject ? (
            // Active subject view
            activeSubject === "writing" ? (
              <WritingPractice onComplete={() => setActiveSubject("reading")} />
            ) : activeSubject === "reading" ? (
              <ReadingPractice onComplete={() => setActiveSubject("math")} />
            ) : activeSubject === "math" ? (
              <MathPractice onComplete={() => setActiveSubject("science")} />
            ) : activeSubject === "science" ? (
              <SciencePractice onComplete={() => setActiveSubject(null)} />
            ) : null
          ) : activeTab === "today" ? (
            // Today tab - subject grid
            <div className="flex-1 bg-gradient-to-b from-primary-light/30 to-white p-4 overflow-auto">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {todaysLessons.map((lesson) => (
                  <button
                    key={lesson.subject}
                    onClick={() => setActiveSubject(lesson.subject)}
                    className={`${lesson.color} p-6 rounded-3xl border-2 border-current/20 hover:scale-105 transition-all shadow-lg`}
                  >
                    <div className="text-5xl mb-3">{lesson.icon}</div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)]">
                      {lesson.title}
                    </p>
                    <p className="text-sm opacity-80 font-[family-name:var(--font-body)]">
                      {lesson.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AppWindow>
  );
}
