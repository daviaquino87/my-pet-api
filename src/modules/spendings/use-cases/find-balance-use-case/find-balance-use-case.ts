import { SpendingRepository } from "../../repositories/spendings-repository";

interface IBalanceRequest {
  userId: string;
}

interface IBalanceResponse {
  balance: number;
}

export class FindBalanceUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({ userId }: IBalanceRequest): Promise<IBalanceResponse> {
    const balance = await this.spendingRepository.countBalance(userId);

    return {
      balance,
    };
  }
}
