import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpendingRepository } from "../../repositories/spendings-repository";
import { GenerateReportUseCase } from "./generate-report-use-case";
import { SpendingRepositoryInMemory } from "../../repositories/in-memory/spending-repository-in-memory";

let spendingsRepository: SpendingRepository;
let sut: GenerateReportUseCase;

describe("Generate report", () => {
  beforeEach(() => {
    spendingsRepository = new SpendingRepositoryInMemory();
    sut = new GenerateReportUseCase(spendingsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be possible to fetch the expenses by period of a user", async () => {
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

    const spendings = await spendingsRepository.searchSpendingsByPeriod(
      "example-user-id",
      new Date("2022-01-19 12:00:00"),
      new Date("2022-01-26 12:00:00")
    );

    const { spendingPdf } = await sut.execute({
      userId: "example-user-id",
      initialDate: new Date("2022-01-20 08:00:00"),
      finalDate: new Date("2022-01-26 08:00:00"),
    });

    expect(spendingPdf).toEqual(expect.any(Buffer));
    expect(spendings).toHaveLength(3);
  });
});
