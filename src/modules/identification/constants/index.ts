import { env } from '@/modules/common/configs/env.config';

export const authConfig = {
  STRATEGY_NAME: 'JWT_STRATEGY',
  JWT_AUTH_SECRET: env.JWT_AUTH_SECRET,
  JWT_AUTH_EXPIRATION: env.JWT_AUTH_EXPIRATION,
};

export const rabbitMqConfig = {
  AMQ_URL_CONNECTION: env.AMQP_URL_CONNECTION,
  VALIDATE_ACCOUNT_EMAIL_QUEUE: 'send-email-to-validate-user-account',
  VALIDATE_ACCOUNT_EMAIL_EXCHANGE: 'my-pet',
  VALIDATE_ACCOUNT_EMAIL_ROUTINGKEY: 'send-email-to-validate-user-account',
};
