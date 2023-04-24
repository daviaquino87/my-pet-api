import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { DeleteSpendingUseCase } from "../use-cases/delete-spending-use-case/delete-spending-use-case";

export function deleteSpending() {
  const userRepository = new PrismaSpendingsRepository();
  const useCase = new DeleteSpendingUseCase(userRepository);

  return useCase;
}
