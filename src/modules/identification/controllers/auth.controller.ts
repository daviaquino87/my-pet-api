import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUserInputDto } from '@/modules/identification/dtos/input/auth-user.input.dto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { AuthUserOutputDto } from '@/modules/identification/dtos/output/auth-user.output.dto';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserUseCase: AuthUserUseCase,
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {}

  @Post('validate-account')
  async validateAccount(
    @Body() validateUserInputDto: ValidateUserInputDto,
  ): Promise<void> {
    await this.validateUserUseCase.execute({
      validateUserInputDto,
    });
  }

  @Post('login')
  async login(
    @Body() authUserInputDto: AuthUserInputDto,
  ): Promise<AuthUserOutputDto> {
    const authUserOutputDto = await this.authUserUseCase.execute({
      authUserInputDto,
    });

    return authUserOutputDto;
  }
}
