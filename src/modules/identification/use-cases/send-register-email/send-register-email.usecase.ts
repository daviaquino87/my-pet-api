import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { resolve } from 'path';

import { EmailService } from '@/modules/email/email.service';

interface ISendRegisterEmailUseCaseInput {
  code: string;
  recipient: string;
}

@Injectable()
export class SendRegisterEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute({
    code,
    recipient,
  }: ISendRegisterEmailUseCaseInput): Promise<void> {
    const pathToTemplate = resolve(
      __dirname,
      '../../utils/templates/first-access.template.ejs',
    );

    const html = await renderFile(pathToTemplate, {
      code,
    });

    await this.emailService.sendEmail({
      from: 'no-reply@mypet.com',
      to: recipient,
      subject: 'Código de primeiro acesso',
      html,
    });
  }
}
