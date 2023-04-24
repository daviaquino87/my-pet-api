import { describe, it, beforeEach, expect } from "vitest";

import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { DeleteSpendingUseCase } from "./delete-spending-use-case";

import { SpendingNotFoundError } from "@/modules/spendings/errors/Spending-not-found-error";

let spendingRepository: SpendingRepositoryInMemory;
let sut: DeleteSpendingUseCase;

describe("delete spendings use case", () => {
  beforeEach(() => {
    spendingRepository = new SpendingRepositoryInMemory();
    sut = new DeleteSpendingUseCase(spendingRepository);
  });
  it("should be able possible to delete a spending", async () => {
    const { id, user_id } = await spendingRepository.create({
      price: 150,
      user_id: "example-user-id",
    });

    await spendingRepository.create({
      price: 250,
      user_id: "example-user-id",
    });

    await sut.execute({
      id,
      user_id,
    });

    expect(spendingRepository.spendings).toHaveLength(1);
    expect(spendingRepository.spendings[0].price).toEqual(250);
  });

  it("should not be able possible to delete a inexistent spending", async () => {
    await expect(() =>
      sut.execute({
        id: "invalid-id",
        user_id: "invalid-user",
      })
    ).rejects.toBeInstanceOf(SpendingNotFoundError);
  });

  it("should not be able possible to delete a spending that is not his", async () => {
    const { id } = await spendingRepository.create({
      price: 150,
      user_id: "example-user-id",
    });

    await expect(() =>
      sut.execute({
        id,
        user_id: "invalid-user-id",
      })
    ).rejects.toBeInstanceOf(SpendingNotFoundError);
  });
});
