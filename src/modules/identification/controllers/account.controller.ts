import { Body, Controller, Get, Post, Query, Redirect, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { env } from '@/modules/common/configs/env.config';
import { RoutePublic } from '@/modules/common/decorators/route-public.decorator';
import { CreateUserInputDto } from '@/modules/identification//dtos/input/create-user.input.dto';
import { UserOutputDto } from '@/modules/identification//dtos/output/user.output.dto';
import { CreateUserUseCase } from '@/modules/identification//use-cases/create-user/create-user.usecase';
import { AuthUserInputDto } from '@/modules/identification/dtos/input/auth-user.input.dto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { AuthUserOutputDto } from '@/modules/identification/dtos/output/auth-user.output.dto';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

import { ICustomRequest } from '../interfaces/custom-request.interface';
import { SendEmailToValidateUserAccountQueue } from '../queues/send-email-to-validate-user-account.queue';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly sendEmailToValidateUserAccountQueue: SendEmailToValidateUserAccountQueue,
    private readonly authUserUseCase: AuthUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {}

  @RoutePublic()
  @Post('register')
  async register(@Body() createUserInputDto: CreateUserInputDto): Promise<UserOutputDto> {
    const { user } = await this.createUserUseCase.execute({
      createUserInputDto,
    });

    await this.sendEmailToValidateUserAccountQueue.producerEmailsToQueue({
      email: user.email,
    });

    return user;
  }

  @Get('validate-email')
  @Redirect(env.REDIRECT_FRONT_HOST, 301)
  async validateEmail(@Query() validateUserInputDto: ValidateUserInputDto): Promise<void> {
    await this.validateUserUseCase.execute({
      validateUserInputDto,
    });
  }

  @Post('login')
  async login(@Body() authUserInputDto: AuthUserInputDto): Promise<AuthUserOutputDto> {
    const authUserOutputDto = await this.authUserUseCase.execute({
      authUserInputDto,
    });

    return authUserOutputDto;
  }

  @Get('me')
  async userData(@Request() request: ICustomRequest): Promise<UserOutputDto> {
    return request.user;
  }
}
