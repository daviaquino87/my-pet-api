import { describe, it, beforeEach, expect } from "vitest";

import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { ListSpendingsUseCase } from "./list-spendings-use-case";

let spendingRepository: SpendingRepositoryInMemory;
let sut: ListSpendingsUseCase;

describe("List spendings use case", () => {
  beforeEach(() => {
    spendingRepository = new SpendingRepositoryInMemory();
    sut = new ListSpendingsUseCase(spendingRepository);
  });

  it("should be able possible to list spendings of an user", async () => {
    for (let i = 1; i <= 5; i++) {
      await spendingRepository.create({
        price: 150 + i,
        user_id: "example-user-id",
      });
    }

    const { spendings } = await sut.execute({
      userId: "example-user-id",
      page: 1,
    });

    expect(spendings).toHaveLength(5);
    expect(spendingRepository.spendings[4].price).toEqual(155);
  });

  it("should be able possible to paginate spendings of an user in 10", async () => {
    for (let i = 1; i <= 12; i++) {
      await spendingRepository.create({
        price: 150 + i,
        user_id: "example-user-id",
      });
    }

    const { spendings } = await sut.execute({
      userId: "example-user-id",
      page: 2,
    });

    expect(spendings).toHaveLength(2);
    expect(spendings).toEqual([
      expect.objectContaining({ price: 161 }),
      expect.objectContaining({ price: 162 }),
    ]);
  });
});
