import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

import { env } from '@/modules/common/configs/env.config';
import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { UsersRepository } from '@/modules/identification/repositories/in-memory/users.repository';
import { ValidateUserUseCase } from '@/modules/identification/use-cases/validate-user/validate-user.usecase';

let userRepository: UsersRepository;
let sut: ValidateUserUseCase;

describe('Validate user [usecase]', () => {
  beforeEach(async () => {
    userRepository = new UsersRepository();
    sut = new ValidateUserUseCase(userRepository);

    userRepository.create({
      id: 'example-user-id',
      name: 'John',
      email: 'JohnDue@email.com',
      passwordHash: await hash('1234567', env.PASSWORD_SALTS),
      accessCodeHash: await hash('1234', env.ACCESS_CODE_SALTS),
      validateAt: null,
      createdAt: new Date(),
    });
  });

  it('validate input cases', async () => {
    const invalidEmailCase = {
      email: 'johnDueemail.com',
      code: '12345',
    };

    await expect(() =>
      sut.execute({
        validateUserInputDto: invalidEmailCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidCodeCase = {
      email: 'johnDue@email.com',
      code: '      ',
    };

    await expect(() =>
      sut.execute({
        validateUserInputDto: invalidCodeCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able possible to validate an user with invalid email', async () => {
    await expect(() =>
      sut.execute({
        validateUserInputDto: {
          email: 'invalidEmail@test.com',
          code: '1234',
        },
      }),
    ).rejects.toBeInstanceOf(ApiBadRequest);
  });

  it('should not be able possible to validate an user with invalid code', async () => {
    await expect(() =>
      sut.execute({
        validateUserInputDto: {
          email: 'JohnDue@email.com',
          code: 'invalidCode',
        },
      }),
    ).rejects.toBeInstanceOf(ApiBadRequest);
  });

  it('should be able possible to validate an  user', async () => {
    await sut.execute({
      validateUserInputDto: {
        email: 'JohnDue@email.com',
        code: '1234',
      },
    });

    expect(userRepository.users[0].validateAt).toEqual(expect.any(Date));
  });
});
