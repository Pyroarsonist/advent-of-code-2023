import dotenv from "dotenv";

dotenv.config();

export const isDevelopment = process.env.NODE_ENV !== "production";

export const someEnv = process.env.SOME_ENV;
