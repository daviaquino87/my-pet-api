import { PrismaSpendingsRepository } from "../repositories/prisma/prisma-spendings-repository";
import { GenerateReportUseCase } from "../use-cases/generate-report-use-case/generate-report-use-case";

export async function generateReport() {
  const spendingRepository = new PrismaSpendingsRepository();
  const useCase = new GenerateReportUseCase(spendingRepository);

  return useCase;
}
