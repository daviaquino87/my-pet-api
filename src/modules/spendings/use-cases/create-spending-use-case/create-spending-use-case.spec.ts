import { describe, it, beforeEach, expect } from "vitest";

import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { CreateSpendingUseCase } from "./create-spending-use-case";

let spendingRepository: SpendingRepositoryInMemory;
let sut: CreateSpendingUseCase;

describe("Create a Spending use case", () => {
  beforeEach(() => {
    spendingRepository = new SpendingRepositoryInMemory();
    sut = new CreateSpendingUseCase(spendingRepository);
  });
  it("should be able possible to create an user", async () => {
    const { spending } = await sut.execute({
      price: 150,
      user_id: "user-01",
    });

    expect(spendingRepository.spendings).toHaveLength(1);
    expect(spendingRepository.spendings[0].id).toEqual(expect.any(String));
  });
});
