import { Request, Response } from "express";
import { z } from "zod";

import { listSpendings } from "@/modules/spendings/factories/make-list-spendings-use-case";

export class ListSpendingsController {
  async handle(request: Request, response: Response) {
    const listSpendingBodySchema = z.object({
      page: z.string().min(1),
    });

    const { page } = listSpendingBodySchema.parse(request.query);
    const { id } = request.user;

    const listSpendingsUseCase = listSpendings();

    const { spendings } = await listSpendingsUseCase.execute({
      userId: id,
      page: parseInt(page),
    });

    return response.status(200).json({
      spendings: spendings,
    });
  }
}
