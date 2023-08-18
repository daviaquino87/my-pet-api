import { Module } from '@nestjs/common';

import { EmailModule } from '@/modules//email/email.module';
import { IdentificationModule } from '@/modules/identification/identification.module';

import { RabbitMqModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [IdentificationModule, EmailModule, RabbitMqModule],
})
export class AppModule {}
