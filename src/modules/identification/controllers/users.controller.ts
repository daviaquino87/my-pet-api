import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoutePublic } from '@/modules/common/decorators/route-public.decorator';
import { CreateUserInputDto } from '@/modules/identification/dtos/input/create-user.input.dto';
import { UserOutputDto } from '@/modules/identification/dtos/output/user.output.dto';
import { JwtAuthGuard } from '@/modules/identification/guards/jwt-auth.guard';
import { ICustomRequest } from '@/modules/identification/interfaces/custom-request.interface';
import { CreateUserUseCase } from '@/modules/identification/use-cases/create-user/create-user.usecase';
import { SendRegisterEmailUseCase } from '@/modules/identification/use-cases/send-register-email/send-register-email.usecase';
import { generateRandomCode } from '@/modules/identification/utils/generate-random-code';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly sendRegisterEmailUseCase: SendRegisterEmailUseCase,
  ) {}

  @Post()
  @RoutePublic()
  async create(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<UserOutputDto> {
    const code = generateRandomCode(6);

    const { user } = await this.createUserUseCase.execute({
      createUserInputDto,
      code,
    });

    await this.sendRegisterEmailUseCase.execute({
      recipient: user.email,
      code,
    });

    return user;
  }

  @Get('me')
  async userData(@Request() request: ICustomRequest) {
    return request.user;
  }
}
