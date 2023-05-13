import { format, transports, createLogger } from "winston";

// constants
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";
export const logger = createLogger({
  format: format.combine(
    format.json(),
    format.splat(),
    format.errors({ stack: true }),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
});

// functions
export function getError(error: unknown) {
  if (error instanceof Error) return error;
  return new Error(String(error));
}
