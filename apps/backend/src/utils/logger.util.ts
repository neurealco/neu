// Logger simple sin dependencias
const logLevels = ["error", "warn", "info", "http", "debug"] as const;
type LogLevel = (typeof logLevels)[number];

const getTimestamp = () => {
  const date = new Date();
  return date.toISOString();
};

const shouldLog = (level: LogLevel) => {
  const currentLevel = process.env.NODE_ENV === "production" ? "info" : "debug";
  const levelIndex = logLevels.indexOf(level);
  const currentIndex = logLevels.indexOf(currentLevel as LogLevel);
  return levelIndex <= currentIndex;
};

const log = (level: LogLevel, message: string, ...meta: any[]) => {
  if (!shouldLog(level)) return;

  const timestamp = getTimestamp();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  if (meta.length > 0) {
    console.log(formattedMessage, ...meta);
  } else {
    console.log(formattedMessage);
  }
};

const logger = {
  error: (message: string, ...meta: any[]) => log("error", message, ...meta),
  warn: (message: string, ...meta: any[]) => log("warn", message, ...meta),
  info: (message: string, ...meta: any[]) => log("info", message, ...meta),
  http: (message: string, ...meta: any[]) => log("http", message, ...meta),
  debug: (message: string, ...meta: any[]) => log("debug", message, ...meta),
};

export default logger;
