import { PrismaUserRepoitory } from "../repositories/prisma/prisma-user-repository";
import { AuthenticateUserUseCase } from "../use-cases/authenticate-user-use-case/authenticate-user-use-case";

export function authenticate() {
  const userRepository = new PrismaUserRepoitory();
  const useCase = new AuthenticateUserUseCase(userRepository);

  return useCase;
}
