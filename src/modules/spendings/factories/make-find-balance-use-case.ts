import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { FindBalanceUseCase } from "../use-cases/find-balance-use-case/find-balance-use-case";

export function findBalance() {
  const userRepository = new PrismaSpendingsRepository();
  const useCase = new FindBalanceUseCase(userRepository);

  return useCase;
}
