import { Global, Module } from '@nestjs/common';

import { AbstractEmail } from '@/modules/email/abstract-email';
import { EmailService } from '@/modules/email/email.service';
import { NodemailerService } from '@/modules/email/nodemailer/nodemailer.service';

@Global()
@Module({
  providers: [
    {
      provide: AbstractEmail,
      useClass: NodemailerService,
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
