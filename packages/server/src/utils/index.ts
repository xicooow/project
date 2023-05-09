// constants
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

// functions
export function getError(error: unknown) {
  if (error instanceof Error) return error;
  return new Error(String(error));
}
