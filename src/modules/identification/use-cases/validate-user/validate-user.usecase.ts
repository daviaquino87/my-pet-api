import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { validateDTO } from '@/modules/common/utils/validateDto';
import { ValidateUserInputDto } from '@/modules/identification/dtos/input/validate-user.input.dto';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

import { User } from '../../entities/User';

interface IValidateUserUseCaseInput {
  validateUserInputDto: ValidateUserInputDto;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: AbstractUsersRepository) {}

  async execute({
    validateUserInputDto,
  }: IValidateUserUseCaseInput): Promise<void> {
    await validateDTO(ValidateUserInputDto, validateUserInputDto);

    const user = await this.userRepository.findUserByEmail({
      email: validateUserInputDto.email,
    });

    if (!user) {
      throw new ApiBadRequest('O usuário informado não foi encontrado');
    }

    const codeMaths = await compare(
      validateUserInputDto.code,
      user.accessCodeHash,
    );

    if (!codeMaths) {
      throw new ApiBadRequest('Código informado invalido');
    }

    const userValidated = new User(user);

    userValidated.validate();

    await this.userRepository.save(userValidated);
  }
}
