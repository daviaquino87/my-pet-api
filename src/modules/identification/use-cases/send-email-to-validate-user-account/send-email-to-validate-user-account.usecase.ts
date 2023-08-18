import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { renderFile } from 'ejs';
import { resolve } from 'path';

import { env } from '@/modules/common/configs/env.config';
import { EmailService } from '@/modules/email/email.service';

interface ISendEmailToValidateUserAccountUseCaseInput {
  recipient: string;
}

@Injectable()
export class SendEmailToValidateUserAccountUseCase {
  constructor(private readonly emailService: EmailService, private readonly jwtService: JwtService) {}

  async execute({ recipient }: ISendEmailToValidateUserAccountUseCaseInput): Promise<void> {
    const pathToTemplate = resolve(__dirname, '../../utils/templates/first-access.template.ejs');

    const host = env.APPLICATION_HOST;
    const accessToken = this.jwtService.sign(
      {
        email: recipient,
      },
      {
        secret: env.JWT_EMAIL_SECRET,
        expiresIn: env.JWT_EMAIL_EXPIRATION,
      },
    );

    const html = await renderFile(pathToTemplate, {
      code: `${host}/account/validate-email?token=${accessToken}`,
    });

    await this.emailService.sendEmail({
      from: 'no-reply@mypet.com',
      to: recipient,
      subject: 'Código de primeiro acesso',
      html,
    });
  }
}
