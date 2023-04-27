import { Request, Response } from "express";
import { z } from "zod";

import { deleteSpending } from "@/modules/spendings/factories/make-delete-spending-use-case";
import { SpendingNotFoundError } from "@/modules/spendings/errors/Spending-not-found-error";
import { setRedis } from "@/lib/ioredis";

export class DeleteSpendingController {
  async handle(request: Request, response: Response) {
    const deleteSpendingParamSchema = z.object({
      spendingId: z.string(),
    });

    const { spendingId } = deleteSpendingParamSchema.parse(request.params);
    const { id } = request.user;

    try {
      const deleteSpendingUseCase = deleteSpending();

      await deleteSpendingUseCase.execute({
        id: spendingId,
        user_id: id,
      });

      await setRedis(`balance_${id}`, "");

      return response.status(204).send();
    } catch (error) {
      if (error instanceof SpendingNotFoundError) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
