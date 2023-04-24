import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { UpdateSpendingUseCase } from "../use-cases/update-spending-use-case/update-spending-use-case";

export function updateSpending() {
  const userRepository = new PrismaSpendingsRepository();
  const useCase = new UpdateSpendingUseCase(userRepository);

  return useCase;
}
