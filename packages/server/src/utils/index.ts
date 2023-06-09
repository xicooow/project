import nodemailer, { SendMailOptions } from "nodemailer";
import { format, transports, createLogger } from "winston";

// constants
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_ADDRESS, pass: EMAIL_PASS },
});
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

export async function sendMail(options: SendMailOptions) {
  try {
    logger.info("Sending email to %s", options.to);
    await transporter.sendMail({
      ...options,
      from: `"Post & Vote" <${EMAIL_ADDRESS}>`,
    });
  } catch (error) {
    const err = getError(error);
    logger.error("Failed to send email with reason %s", err.message);
    throw err;
  }
}
