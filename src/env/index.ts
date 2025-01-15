import "dotenv/config";

import { z } from "zod";

// Schema
const envSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.number().default(5433),
  PORT: z.number().default(3001),
  DATABASE_URL: z.string(),
});

// Valida as variáveis de ambiente
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
