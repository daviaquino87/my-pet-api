import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InvalidPeriodByReportError } from "@/modules/spendings/errors/Invalid-period-by-report-error";
import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { SpendingRepository } from "@/modules/spendings/repositories/spendings-repository";
import { GenerateReportUseCase } from "@/modules/spendings/use-cases/generate-report-use-case/generate-report-use-case";

let spendingsRepository: SpendingRepository;
let sut: GenerateReportUseCase;

describe("GenerateReportUseCase", () => {
  beforeEach(() => {
    spendingsRepository = new SpendingRepositoryInMemory();
    sut = new GenerateReportUseCase(spendingsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be possible to generate a report with expenses by period of a user", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await spendingsRepository.create({
      user_id: "example-user-id",
      price: 13,
    });

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));

    await spendingsRepository.create({
      user_id: "example-user-id",
      price: 14,
    });

    vi.setSystemTime(new Date(2022, 0, 25, 8, 0, 0));

    await spendingsRepository.create({
      user_id: "example-user-id",
      price: 15,
    });

    const { spendingPdf } = await sut.execute({
      userId: "example-user-id",
      initialDate: new Date("2022-01-19 12:00:00"),
      finalDate: new Date("2022-01-26 12:00:00"),
    });

    expect(spendingPdf).toBeInstanceOf(Buffer);
  });

  it("should throw an InvalidPeriodByReportError if there are no expenses in the given period", async () => {
    await expect(
      sut.execute({
        userId: "example-user-id",
        initialDate: new Date("2022-01-20 08:00:00"),
        finalDate: new Date("2022-01-26 08:00:00"),
      })
    ).rejects.toBeInstanceOf(InvalidPeriodByReportError);
  });
});
