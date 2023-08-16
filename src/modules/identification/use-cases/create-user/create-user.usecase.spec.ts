import { BadRequestException } from '@nestjs/common';

import { ApiConflict } from '@/modules/common/exceptions/exceptions';
import { UserOutputDto } from '@/modules/identification/dtos/output/user.output.dto';
import { UsersRepository } from '@/modules/identification/repositories/in-memory/users.repository';
import { CreateUserUseCase } from '@/modules/identification/use-cases/create-user/create-user.usecase';

let usersRepository: UsersRepository;
let sut: CreateUserUseCase;

describe('Create user [usecase]', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('validate input cases', async () => {
    const invalidNameCase = {
      name: '',
      email: 'johnDue@email.com',
      password: '1234567Abcd',
    };

    await expect(() =>
      sut.execute({
        createUserInputDto: invalidNameCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidLengthNameCase = {
      name: 'john',
      email: 'johnDue@email.com',
      password: '1234567Abcd',
    };

    await expect(() =>
      sut.execute({
        createUserInputDto: invalidLengthNameCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidEmailCase = {
      name: 'john Due',
      email: 'johnDue',
      password: '1234567Abcd',
    };

    await expect(() =>
      sut.execute({
        createUserInputDto: invalidEmailCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidPasswordCase = {
      name: 'john Due',
      email: 'johnDue@email.com',
      password: '123',
    };

    await expect(() =>
      sut.execute({
        createUserInputDto: invalidPasswordCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const invalidCharacterPasswordCase = {
      name: 'john Due',
      email: 'johnDue@email.com',
      password: '        ',
    };

    await expect(() =>
      sut.execute({
        createUserInputDto: invalidCharacterPasswordCase,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able possible to create an user with the email already registered', async () => {
    await usersRepository.create({
      id: 'example-user-id',
      name: 'example-user-name',
      email: 'example@email.com',
      passwordHash: 'example-hash-password',
      validateAt: null,
      createdAt: new Date(),
    });

    expect(() =>
      sut.execute({
        createUserInputDto: {
          name: 'example-user-name',
          email: 'example@email.com',
          password: 'example-hash-password',
        },
      }),
    ).rejects.toBeInstanceOf(ApiConflict);
  });

  it('should be able possible to create an user', async () => {
    const { user } = await sut.execute({
      createUserInputDto: {
        name: 'john Due',
        email: 'john@email.com',
        password: '123456',
      },
    });

    const userDto = new UserOutputDto();
    const expectedUserOutputDto = Object.assign(userDto, user);

    expect(user).toMatchObject(expectedUserOutputDto);
    expect(usersRepository.users).toHaveLength(1);
    expect(user.email).toEqual(usersRepository.users[0].email);
  });
});
