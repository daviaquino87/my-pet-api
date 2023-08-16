import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { env } from '@/modules/common/configs/env.config';
import { ApiConflict } from '@/modules/common/exceptions/exceptions';
import { validateDTO } from '@/modules/common/utils/validateDto';
import { CreateUserInputDto } from '@/modules/identification/dtos/input/create-user.input.dto';
import { UserOutputDto } from '@/modules/identification/dtos/output/user.output.dto';
import { User } from '@/modules/identification/entities/User';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

interface ICreateUserUseCaseInput {
  createUserInputDto: CreateUserInputDto;
}

interface ICreateUserUseCaseOutput {
  user: UserOutputDto;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: AbstractUsersRepository) {}

  async execute({ createUserInputDto }: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    await validateDTO(CreateUserInputDto, createUserInputDto);

    const userAlreadyExists = await this.userRepository.findUserByEmail({
      email: createUserInputDto.email,
    });

    if (userAlreadyExists) {
      throw new ApiConflict('O email informado pertence a um usuário valido');
    }

    const passwordHash = await hash(createUserInputDto.password, env.PASSWORD_SALTS);

    const user = new User({
      name: createUserInputDto.name,
      email: createUserInputDto.email,
      passwordHash,
    });

    await this.userRepository.create(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        validateAt: user.validateAt,
        createdAt: user.createdAt,
      },
    };
  }
}
