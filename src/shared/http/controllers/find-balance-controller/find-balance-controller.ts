import { findBalance } from "@/modules/spendings/factories/make-find-balance-use-case";
import { Request, Response } from "express";

export class FindBalanceController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const findBalanceUseCase = findBalance();

    const { balance } = await findBalanceUseCase.execute({
      userId: id,
    });

    return response.status(200).json({ balance: balance });
  }
}
