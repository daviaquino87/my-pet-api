import { Body, Controller, Get, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { env } from '@/modules/common/configs/env.config';
import { RoutePublic } from '@/modules/common/decorators/route-public.decorator';
import { CreateUserInputDto } from '@/modules/identification//dtos/input/create-user.input.dto';
import { UserOutputDto } from '@/modules/identification//dtos/output/user.output.dto';
import { CreateUserUseCase } from '@/modules/identification//use-cases/create-user/create-user.usecase';
import { AuthUserInputDto } from '@/modules/identification/dtos/input/auth-user.input.dto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { AuthUserOutputDto } from '@/modules/identification/dtos/output/auth-user.output.dto';
import { ICustomRequest } from '@/modules/identification/interfaces/custom-request.interface';
import { SendEmailToValidateUserAccountQueue } from '@/modules/identification/queues/send-email-to-validate-user-account.queue';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Account')
@ApiBearerAuth()
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

  @RoutePublic()
  @Get('validate-email')
  async validateEmail(@Query() validateUserInputDto: ValidateUserInputDto, @Res() res: Response): Promise<any> {
    await this.validateUserUseCase.execute({
      validateUserInputDto,
    });

    res.redirect(301, env.REDIRECT_FRONT_HOST);
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
