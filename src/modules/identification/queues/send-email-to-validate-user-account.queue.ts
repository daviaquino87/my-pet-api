import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { rabbitMqConfig } from '@/modules/identification/constants';
import { ISendValidateAccountEmailToQueue } from '@/modules/identification/interfaces/send--validate-account-email-to-queue';
import { SendEmailToValidateUserAccountUseCase } from '@/modules/identification/use-cases/send-email-to-validate-user-account/send-email-to-validate-user-account.usecase';

@Injectable()
export class SendEmailToValidateUserAccountQueue {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly sendEmailToValidateUserAccountUseCase: SendEmailToValidateUserAccountUseCase,
  ) {}

  async producerEmailsToQueue(data: ISendValidateAccountEmailToQueue): Promise<void> {
    this.amqpConnection.publish(
      rabbitMqConfig.VALIDATE_ACCOUNT_EMAIL_EXCHANGE,
      rabbitMqConfig.VALIDATE_ACCOUNT_EMAIL_QUEUE,
      data,
    );
  }

  @RabbitRPC({
    exchange: rabbitMqConfig.VALIDATE_ACCOUNT_EMAIL_EXCHANGE,
    routingKey: rabbitMqConfig.VALIDATE_ACCOUNT_EMAIL_ROUTINGKEY,
    queue: rabbitMqConfig.VALIDATE_ACCOUNT_EMAIL_QUEUE,
  })
  async consumerEmailsToQueue(event: ISendValidateAccountEmailToQueue): Promise<boolean> {
    await this.sendEmailToValidateUserAccountUseCase.execute({
      recipient: event.email,
    });

    return true;
  }
}
