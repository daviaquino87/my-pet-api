import { SpendingRepository } from "@/modules/spendings/repositories/spendings-repository";
import { SpendingNotFoundError } from "@/modules/spendings/errors/Spending-not-found-error";

interface IDeleteSpendingUseCaseRequest {
  id: string;
  user_id: string;
}

export class DeleteSpendingUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({ id, user_id }: IDeleteSpendingUseCaseRequest): Promise<void> {
    const spending = await this.spendingRepository.findSpendingByUser(
      id,
      user_id
    );

    if (!spending) {
      throw new SpendingNotFoundError();
    }

    await this.spendingRepository.delete(id);
  }
}
