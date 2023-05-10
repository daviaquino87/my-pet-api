import { Prisma, Spending } from "@prisma/client";

import { SpendingRepository } from "@/modules/spendings/repositories/spendings-repository";

interface ISpendingResponse {
  spending: Spending;
}

export class CreateSpendingUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({
    price,
    user_id,
    date,
  }: Prisma.SpendingUncheckedCreateInput): Promise<ISpendingResponse> {
    const spending = await this.spendingRepository.create({
      price,
      user_id,
      date: date ?? new Date(),
    });

    return {
      spending,
    };
  }
}
