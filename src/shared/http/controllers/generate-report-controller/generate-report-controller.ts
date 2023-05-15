import { Request, Response } from "express";
import { z } from "zod";

import { generateReport } from "@/modules/spendings/factories/make-generate-report-use-case";
import { InvalidPeriodByReportError } from "@/modules/spendings/errors/Invalid-period-by-report-error";
import { FailedToGenerateHtmlError } from "@/lib/errors/failed-to-generate-html-error";
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

    try {
      const { spendingPdf } = await generateSpendingReport.execute({
        userId: id,
        initialDate,
        finalDate,
      });

      response.setHeader("Content-Type", "application/pdf");
      return response.end(spendingPdf);
    } catch (error) {
      if (
        error instanceof InvalidPeriodByReportError ||
        FailedToGenerateHtmlError
      ) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
