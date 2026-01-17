// Generate session ID when the module is first loaded (server start)
const SESSION_ID = new Date().toISOString().replace(/[:.]/g, "-");

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

  // Skip file writing in serverless environments

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
    startTime: SESSION_ID,
    entryCount: memoryLog.length,
    errorCount: memoryLog.filter(e => e.level === "ERROR").length,
    warnCount: memoryLog.filter(e => e.level === "WARN").length,
  };
}
