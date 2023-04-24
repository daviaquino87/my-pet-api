import { Request, Response } from "express";
import { z } from "zod";

import { createSpending } from "@/modules/spendings/factories/make-create-spending-use-case";

export class CreateSpendingController {
  async handle(request: Request, response: Response) {
    const createSpendingBodySchema = z.object({
      price: z.number(),
      date: z
        .string()
        .transform((value) => (value ? new Date(value) : new Date())),
    });

    const { price, date } = createSpendingBodySchema.parse(request.body);
    const { id } = request.user;

    const createSpendingUseCase = createSpending();

    const { spending } = await createSpendingUseCase.execute({
      price,
      date,
      user_id: id,
    });

    return response.status(201).json(spending);
  }
}
