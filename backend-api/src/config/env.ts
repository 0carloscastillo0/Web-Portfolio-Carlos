import { AppError } from "../utils/AppError";

export const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new AppError(`Missing required environment variable: ${name}`, 500);
  }
  return value;
};
