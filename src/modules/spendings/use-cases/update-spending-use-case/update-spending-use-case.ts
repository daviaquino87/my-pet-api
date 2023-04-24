import { Spending } from "@prisma/client";
import { SpendingRepository } from "../../repositories/spendings-repository";
import { SpendingNotFoundError } from "../../errors/Spending-not-found-error";

interface IUpdateSpendingUseCaseRequest {
  userId: string;
  spendingId: string;
  price?: number;
  date?: Date;
}

interface IUpdateSpendingUseCaseResponse {
  spending: Spending;
}

export class UpdateSpendingUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({
    spendingId,
    userId,
    date,
    price,
  }: IUpdateSpendingUseCaseRequest): Promise<IUpdateSpendingUseCaseResponse> {
    const spending = await this.spendingRepository.findSpendingByUser(
      spendingId,
      userId
    );

    if (!spending) {
      throw new SpendingNotFoundError();
    }

    spending.date = date ?? spending.date;
    spending.price = price ?? spending.price;

    await this.spendingRepository.save(spending);

    return {
      spending,
    };
  }
}
