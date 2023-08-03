import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),

  PASSWORD_SALTS: z.coerce.number().default(6),
  ACCESS_CODE_SALTS: z.coerce.number().default(4),

  JWT_AUTH_SECRET: z.string(),
  JWT_AUTH_EXPIRATION: z.string().default('1h'),

  NODEMAILER_HOST: z.string(),
  NODEMAILER_PORT: z.coerce.number(),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid user environment variables:', _env.error.format());

  throw new Error('Invalid environment variables of config users.');
}

export const env = _env.data;
