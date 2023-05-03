import { User, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

import { UserRepository } from "@/modules/users/repositories/user-repository";
import { InvalidEmailError } from "@/modules/users/errors/invalid-email-error";

interface IUserResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<IUserResponse> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new InvalidEmailError();
    }

    const password = await hash(password_hash, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: password,
    });

    return {
      user,
    };
  }
}
