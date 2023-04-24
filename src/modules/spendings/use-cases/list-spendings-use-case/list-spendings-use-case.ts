import { Spending } from "@prisma/client";
import { SpendingRepository } from "@/modules/spendings/repositories/spendings-repository";

interface IListSpendingRequest {
  userId: string;
  page: number;
}

interface IListSpendingResponse {
  spendings: Spending[];
}

export class ListSpendingsUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({
    userId,
    page,
  }: IListSpendingRequest): Promise<IListSpendingResponse> {
    const spendings = await this.spendingRepository.findManyByUserId(
      userId,
      page
    );

    return {
      spendings,
    };
  }
}
