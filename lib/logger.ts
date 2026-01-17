import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Generate session ID when the module is first loaded (server start)
const SESSION_ID = new Date().toISOString().replace(/[:.]/g, "-");
const LOGS_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOGS_DIR, `session-${SESSION_ID}.log`);

// Ensure logs directory exists
if (!existsSync(LOGS_DIR)) {
  mkdirSync(LOGS_DIR, { recursive: true });
}

// Write session header
writeFileSync(
  LOG_FILE,
  `================================================================================
SESSION STARTED: ${new Date().toISOString()}
SESSION ID: ${SESSION_ID}
================================================================================\n\n`
);

export interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  source: string;
  message: string;
  details?: unknown;
}

// In-memory log for quick access via API
const memoryLog: LogEntry[] = [];

function formatLogEntry(entry: LogEntry): string {
  const detailsStr = entry.details 
    ? `\n  Details: ${JSON.stringify(entry.details, null, 2).replace(/\n/g, "\n  ")}`
    : "";
  
  return `[${entry.timestamp}] [${entry.level}] [${entry.source}] ${entry.message}${detailsStr}\n`;
}

export function log(level: LogEntry["level"], source: string, message: string, details?: unknown) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    source,
    message,
    details,
  };

  // Add to memory
  memoryLog.push(entry);

  // Write to file
  try {
    appendFileSync(LOG_FILE, formatLogEntry(entry));
  } catch (err) {
    console.error("Failed to write to log file:", err);
  }

  // Also console log
  const consoleMethod = level === "ERROR" ? console.error : level === "WARN" ? console.warn : console.log;
  consoleMethod(`[${source}]`, message, details || "");
}

export function info(source: string, message: string, details?: unknown) {
  log("INFO", source, message, details);
}

export function warn(source: string, message: string, details?: unknown) {
  log("WARN", source, message, details);
}

export function error(source: string, message: string, details?: unknown) {
  log("ERROR", source, message, details);
}

export function getSessionLogs(): LogEntry[] {
  return memoryLog;
}

export function getSessionInfo() {
  return {
    sessionId: SESSION_ID,
    logFile: LOG_FILE,
    startTime: SESSION_ID,
    entryCount: memoryLog.length,
    errorCount: memoryLog.filter(e => e.level === "ERROR").length,
    warnCount: memoryLog.filter(e => e.level === "WARN").length,
  };
}
