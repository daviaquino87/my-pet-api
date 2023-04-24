import { User } from "@prisma/client";
import { compare } from "bcryptjs";

import { UserRepository } from "@/modules/users/repositories/user-repository";
import { InvalidCredentialsError } from "@/modules/users/errors/invalid-cretential-error";

interface IAuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface IIAuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserUseCaseRequest): Promise<IIAuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
