import { Injectable } from '@nestjs/common';

import { AbstractEmail } from '@/modules/email/abstract-email';
import { ISendEmail } from '@/modules/email/interfaces/send-email.interface';

@Injectable()
export class EmailService {
  constructor(private readonly emailSender: AbstractEmail) {}

  async sendEmail(email: ISendEmail): Promise<void> {
    await this.emailSender.send(email);
  }
}
