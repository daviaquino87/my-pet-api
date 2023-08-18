import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { validateDTO } from '@/modules/common/utils/validateDto';
import { authConfig } from '@/modules/identification/constants';
import { AuthUserInputDto } from '@/modules/identification/dtos/input/auth-user.input.dto';
import { AuthUserOutputDto } from '@/modules/identification/dtos/output/auth-user.output.dto';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

interface IAuthUserUseCaseInput {
  authUserInputDto: AuthUserInputDto;
}

type IAuthUserUseCaseOutput = AuthUserOutputDto;

@Injectable()
export class AuthUserUseCase {
  constructor(private readonly userRepository: AbstractUsersRepository, private jwtService: JwtService) {}

  async execute({ authUserInputDto }: IAuthUserUseCaseInput): Promise<IAuthUserUseCaseOutput> {
    await validateDTO(AuthUserInputDto, authUserInputDto);

    const user = await this.userRepository.findUserByEmail({
      email: authUserInputDto.email,
    });

    if (!user) {
      throw new ApiBadRequest('Email ou senha inválidos');
    }

    const passwordMaths = await compare(authUserInputDto.password, user.passwordHash);

    if (!passwordMaths) {
      throw new ApiBadRequest('Email ou senha inválidos');
    }

    if (!user.validateAt) {
      throw new ApiBadRequest('validação de primeiro acesso pendente');
    }

    const accessToken = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        secret: authConfig.JWT_AUTH_SECRET,
        expiresIn: authConfig.JWT_AUTH_EXPIRATION,
      },
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    };
  }
}
