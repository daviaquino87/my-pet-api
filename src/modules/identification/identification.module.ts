import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@/modules/identification/controllers/auth.controller';
import { UsersController } from '@/modules/identification/controllers/users.controller';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';
import { UsersRepository } from '@/modules/identification/repositories/in-memory/users.repository';
import { JWTAuthStrategy } from '@/modules/identification/strategies/jwt.strategy';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';
import { CreateUserUseCase } from '@/modules/identification/use-cases/create-user/create-user.usecase';
import { SendRegisterEmailUseCase } from '@/modules/identification/use-cases/send-register-email/send-register-email.usecase';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [
    CreateUserUseCase,
    ValidateUserUseCase,
    AuthUserUseCase,
    SendRegisterEmailUseCase,
    JWTAuthStrategy,
    {
      provide: AbstractUsersRepository,
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController, AuthController],
})
export class IdentificationModule {}
