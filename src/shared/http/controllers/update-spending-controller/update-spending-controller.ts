import { SpendingNotFoundError } from "@/modules/spendings/errors/Spending-not-found-error";
import { updateSpending } from "@/modules/spendings/factories/make-update-spending-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export class UpdateSpendingController {
  async handle(request: Request, response: Response) {
    const updateSpendingBodySchema = z.object({
      price: z.number().optional(),
      date: z.date().optional(),
    });

    const { price, date } = updateSpendingBodySchema.parse(request.body);

    const updateSpendingParamSchema = z.object({
      spendingId: z.string(),
    });

    const { spendingId } = updateSpendingParamSchema.parse(request.params);
    const { id } = request.user;

    try {
      const updateSpendingUseCase = updateSpending();

      const { spending } = await updateSpendingUseCase.execute({
        spendingId,
        userId: id,
        date,
        price,
      });

      return response.status(200).json({
        spending: spending,
      });
    } catch (error) {
      if (error instanceof SpendingNotFoundError) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
