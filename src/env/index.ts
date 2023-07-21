import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_PASS: z.string(),
  PORT: z.coerce.number().default(3000),
  NODEMAILER_HOST: z.string(),
  NODEMAILER_PORT: z.coerce.number(),
  NODEMAILER_USER: z.coerce.string(),
  NODEMAILER_PASS: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("invalid environment variables", _env.error.format());

  throw new Error("invalid environment variables.");
}

export const env = _env.data;
