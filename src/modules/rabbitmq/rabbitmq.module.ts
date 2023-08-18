import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

import { rabbitMqConfig } from '../identification/constants';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'my-pet',
          type: 'direct',
        },
      ],
      uri: rabbitMqConfig.AMQ_URL_CONNECTION,
      connectionInitOptions: { wait: false },
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMqModule {}
