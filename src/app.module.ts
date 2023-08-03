import { Module } from '@nestjs/common';

import { EmailModule } from '@/modules//email/email.module';
import { IdentificationModule } from '@/modules/identification/identification.module';

@Module({
  imports: [IdentificationModule, EmailModule],
})
export class AppModule {}
