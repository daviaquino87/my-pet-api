import { describe, it, beforeEach, expect } from "vitest";

import { SpendingRepositoryInMemory } from "@/modules/spendings/repositories/in-memory/spending-repository-in-memory";
import { UpdateSpendingUseCase } from "./update-spending-use-case";

import { SpendingNotFoundError } from "@/modules/spendings/errors/Spending-not-found-error";

let spendingRepository: SpendingRepositoryInMemory;
let sut: UpdateSpendingUseCase;

describe("update spendings use case", () => {
  beforeEach(() => {
    spendingRepository = new SpendingRepositoryInMemory();
    sut = new UpdateSpendingUseCase(spendingRepository);
  });
  it("should be able possible to update the price of a spending", async () => {
    const { id, user_id } = await spendingRepository.create({
      price: 150,
      user_id: "example-user-id",
    });

    const { spending } = await sut.execute({
      spendingId: id,
      userId: user_id,
      price: 200,
    });

    expect(spendingRepository.spendings[0].price).toEqual(200);
    expect(spendingRepository.spendings).toHaveLength(1);
  });
  it("should be able possible to update the date of a spending", async () => {
    const { id, user_id } = await spendingRepository.create({
      price: 150,
      user_id: "example-user-id",
    });

    const { spending } = await sut.execute({
      spendingId: id,
      userId: user_id,
      date: new Date("2023-04-25 23:59:59"),
    });

    expect(spendingRepository.spendings[0].date).toEqual(
      new Date("2023-04-25 23:59:59")
    );
    expect(spendingRepository.spendings).toHaveLength(1);
  });
  it("should not be able possible to update a inexistent spending", async () => {
    await expect(() =>
      sut.execute({
        spendingId: "invalid-id",
        userId: "invalid-user-id",
        price: 200,
      })
    ).rejects.toBeInstanceOf(SpendingNotFoundError);
  });
});
