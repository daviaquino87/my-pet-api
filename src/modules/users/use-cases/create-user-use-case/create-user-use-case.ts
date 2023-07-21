import { Prisma, User } from "@prisma/client";
import { hash } from "bcryptjs";

import { InvalidEmailError } from "@/modules/users/errors/invalid-email-error";
import { UserRepository } from "@/modules/users/repositories/user-repository";

interface IUserResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password_hash,
    first_access_code,
  }: Prisma.UserCreateInput): Promise<IUserResponse> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new InvalidEmailError();
    }

    const password = await hash(password_hash, 6);
    const cryptCode = await hash(first_access_code, 4);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: password,
      first_access_code: cryptCode,
    });

    return {
      user,
    };
  }
}
