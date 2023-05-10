import { Request, Response } from "express";
import { z } from "zod";

import { listSpendings } from "@/modules/spendings/factories/make-list-spendings-use-case";
import { generateReport } from "@/modules/spendings/factories/make-generate-report-use-case";

export class GenerateReportController {
  async handle(request: Request, response: Response) {
    const generateReportQuerySchema = z.object({
      initialDate: z
        .string()
        .transform((value) => (value ? new Date(value) : new Date())),
      finalDate: z
        .string()
        .transform((value) => (value ? new Date(value) : new Date())),
    });

    const { initialDate, finalDate } = generateReportQuerySchema.parse(
      request.query
    );
    const { id } = request.user;

    const generateSpendingReport = await generateReport();

    const { spendingPdf } = await generateSpendingReport.execute({
      userId: id,
      initialDate,
      finalDate,
    });

    response.setHeader("Content-Type", "application/pdf");
    response.send(spendingPdf);
  }
}
