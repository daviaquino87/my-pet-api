import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { CreateSpendingUseCase } from "../use-cases/create-spending-use-case/create-spending-use-case";

export function createSpending() {
  const userRepository = new PrismaSpendingsRepository();
  const useCase = new CreateSpendingUseCase(userRepository);

  return useCase;
}
