import { env } from '@/modules/common/configs/env.config';

export const authConfig = {
  STRATEGY_NAME: 'JWT_STRATEGY',
  JWT_AUTH_SECRET: env.JWT_AUTH_SECRET,
  JWT_AUTH_EXPIRATION: env.JWT_AUTH_EXPIRATION,
};
