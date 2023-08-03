import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { env } from '@/modules/common/configs/env.config';
import { ApiBadRequest } from '@/modules/common/exceptions/exceptions';
import { UsersRepository } from '@/modules/identification/repositories/in-memory/users.repository';
import { AuthUserUseCase } from '@/modules/identification/use-cases/auth-user/auth-user.usecase';

let userRepository: UsersRepository;
let sut: AuthUserUseCase;

const jwtServiceMock = {
  sign(any: any): string {
    return 'example-jwt-token';
  },
} as unknown as JwtService;

describe('Auth user [usecase]', () => {
  beforeEach(async () => {
    userRepository = new UsersRepository();
    sut = new AuthUserUseCase(userRepository, jwtServiceMock);

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
      password: '1234567Abcd',
    };

    await expect(() =>
      sut.execute({
        authUserInputDto: invalidEmailCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidPasswordCase = {
      email: 'johnDue@email.com',
      password: '      ',
    };

    await expect(() =>
      sut.execute({
        authUserInputDto: invalidPasswordCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able possible to auth an user with invalid email', async () => {
    await expect(() =>
      sut.execute({
        authUserInputDto: {
          email: 'invalidEmail@test.com',
          password: '1234567',
        },
      }),
    ).rejects.toBeInstanceOf(ApiBadRequest);
  });

  it('should not be able possible to auth an user with invalid password', async () => {
    await expect(() =>
      sut.execute({
        authUserInputDto: {
          email: 'JohnDue@email.com',
          password: 'invalidPassword',
        },
      }),
    ).rejects.toBeInstanceOf(ApiBadRequest);
  });

  it('should not be able possible to auth an user with not validated yet', async () => {
    await expect(() =>
      sut.execute({
        authUserInputDto: {
          email: 'JohnDue@email.com',
          password: '1234567',
        },
      }),
    ).rejects.toBeInstanceOf(ApiBadRequest);
  });

  it('should be able possible to auth a valide user', async () => {
    userRepository.users[0].validateAt = new Date();

    const authUserOutputDto = await sut.execute({
      authUserInputDto: {
        email: 'JohnDue@email.com',
        password: '1234567',
      },
    });

    expect(authUserOutputDto.accessToken).toEqual(expect.any(String));
    expect(authUserOutputDto.user.email).toEqual(userRepository.users[0].email);
  });
});
