import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

import { env } from '@/modules/common/configs/env.config';
import { AbstractEmail } from '@/modules/email/abstract-email';
import { ISendEmail } from '@/modules/email/interfaces/send-email.interface';

@Injectable()
export class NodemailerService implements AbstractEmail {
  private transporter = createTransport({
    host: env.NODEMAILER_HOST,
    port: env.NODEMAILER_PORT,
    auth: {
      user: env.NODEMAILER_USER,
      pass: env.NODEMAILER_PASS,
    },
  });

  async send({ from, to, subject, html }: ISendEmail): Promise<void> {
    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
