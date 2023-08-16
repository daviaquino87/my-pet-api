import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { env } from '@/modules/common/configs/env.config';
import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { validateDTO } from '@/modules/common/utils/validateDto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { User } from '@/modules/identification/entities/User';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

interface IValidateUserUseCaseInput {
  validateUserInputDto: ValidateUserInputDto;
}

interface JwtPayload {
  email: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: AbstractUsersRepository, private readonly jwtService: JwtService) {}

  private async validateToken(token: string): Promise<void> {
    try {
      await this.jwtService.verify(token, { secret: env.JWT_EMAIL_SECRET });
    } catch (error) {
      throw new ApiBadRequest('O token de validação informado está invalido.');
    }
  }

  async execute({ validateUserInputDto }: IValidateUserUseCaseInput): Promise<void> {
    await validateDTO(ValidateUserInputDto, validateUserInputDto);
    await this.validateToken(validateUserInputDto.token);

    const jwtPayload = this.jwtService.decode(validateUserInputDto.token) as JwtPayload;

    const user = await this.userRepository.findUserByEmail({ email: jwtPayload.email });

    if (!user) {
      throw new ApiBadRequest('O usuário informado não foi encontrado');
    }

    const userValidated = new User(user);

    userValidated.validate();

    await this.userRepository.save(userValidated);
  }
}
