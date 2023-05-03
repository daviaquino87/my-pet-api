import { describe, it, beforeEach, expect } from "vitest";

import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { FindBalanceUseCase } from "./find-balance-use-case";

let spendingRepository: SpendingRepositoryInMemory;
let sut: FindBalanceUseCase;

describe("Balance use case", () => {
  beforeEach(() => {
    spendingRepository = new SpendingRepositoryInMemory();
    sut = new FindBalanceUseCase(spendingRepository);
  });

  it("should be able possible to list a balance of an user", async () => {
    for (let i = 1; i <= 5; i++) {
      await spendingRepository.create({
        price: 150,
        user_id: "example-user-id",
      });
    }

    const { balance } = await sut.execute({
      userId: "example-user-id",
    });

    expect(balance).toEqual(750);
  });
});
