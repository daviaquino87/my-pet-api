import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { validateDTO } from '@/modules/common/utils/validateDto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

import { User } from '../../entities/User';

interface IValidateUserUseCaseInput {
  validateUserInputDto: ValidateUserInputDto;
}

interface JwtPayload {
  email: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: AbstractUsersRepository, private readonly jwtService: JwtService) {}

  async execute({ validateUserInputDto }: IValidateUserUseCaseInput): Promise<void> {
    await validateDTO(ValidateUserInputDto, validateUserInputDto);

    const decodedToken = await this.jwtService.verify(validateUserInputDto.code, { secret: 'sendEmailJwt' });
    if (Date.now() >= decodedToken.exp * 1000) {
      throw new Error('O token de validação expirou');
    }

    const jwtPayload = this.jwtService.decode(validateUserInputDto.code) as JwtPayload;

    const user = await this.userRepository.findUserByEmail({ email: jwtPayload.email });

    if (!user) {
      throw new ApiBadRequest('O usuário informado não foi encontrado');
    }

    const userValidated = new User(user);

    userValidated.validate();

    await this.userRepository.save(userValidated);
  }
}
