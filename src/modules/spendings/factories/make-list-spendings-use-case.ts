import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { ListSpendingsUseCase } from "../use-cases/list-spendings-use-case/list-spendings-use-case";

export function listSpendings() {
  const spendingRepository = new PrismaSpendingsRepository();
  const useCase = new ListSpendingsUseCase(spendingRepository);

  return useCase;
}
