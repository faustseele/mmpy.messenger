type LogLevel = "debug" | "info" | "warn" | "error";

/// <reference types="vite/client" />
const isDevelopment = import.meta.env.DEV;

class Logger {
  private level: LogLevel = "info";

  setLevel(level: LogLevel) {
    this.level = level;
  }

  debug(message: string = "", ...args: unknown[]) {
    if (this.shouldLog("debug")) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string = "", ...args: unknown[]) {
    if (this.shouldLog("info")) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string = "", ...args: unknown[]) {
    if (this.shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string = "", ...args: unknown[]) {
    if (this.shouldLog("error")) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  /* if 'dev' excl. 'debug' */
  private shouldLog(level: LogLevel): boolean {
    const levels = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }
}

export const lgg = new Logger();

lgg.setLevel(isDevelopment ? "debug" : "info");
