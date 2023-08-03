import { Body, Controller, Post } from '@nestjs/common';

import { AuthUserInputDto } from '../dtos/input/auth-user.input.dto';
import { ValidateUserInputDto } from '../dtos/input/validate-user.input.dto';
import { AuthUserOutputDto } from '../dtos/output/auth-user.output';
import { AuthUserUseCase } from '../use-cases/auth-user/auth-user.usecase';
import { ValidateUserUseCase } from '../use-cases/validate-user/validate-user.usecase';

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
