import { PrismaUserRepoitory } from "../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../use-cases/create-user-use-case/create-user-use-case";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepoitory();
  const useCase = new CreateUserUseCase(userRepository);

  return useCase;
}
