import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountController } from '@/modules/identification/controllers/account.controller';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';
import { UsersRepository } from '@/modules/identification/repositories/in-memory/users.repository';
import { JWTAuthStrategy } from '@/modules/identification/strategies/jwt.strategy';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';
import { CreateUserUseCase } from '@/modules/identification/use-cases/create-user/create-user.usecase';
import { SendEmailToValidateUserAccountUseCase } from '@/modules/identification/use-cases/send-email-to-validate-user-account/send-email-to-validate-user-account.usecase';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

import { SendEmailToValidateUserAccountQueue } from './queues/send-email-to-validate-user-account.queue';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [
    CreateUserUseCase,
    ValidateUserUseCase,
    AuthUserUseCase,
    SendEmailToValidateUserAccountUseCase,
    JWTAuthStrategy,
    {
      provide: AbstractUsersRepository,
      useClass: UsersRepository,
    },
    SendEmailToValidateUserAccountQueue,
  ],
  controllers: [AccountController],
})
export class IdentificationModule {}
