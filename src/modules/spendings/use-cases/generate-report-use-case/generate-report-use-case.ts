import { SpendingRepository } from "../../repositories/spendings-repository";
import { generatePdfFromHtml } from "@/lib/pdfHtml";

import dayjs from "dayjs";
import { formatNumberToBRLCoin } from "@/utils/format-number-to-BRL-coin";
import { InvalidPeriodByReportError } from "../../errors/Invalid-period-by-report-error";

interface IGenerateReportRequest {
  userId: string;
  initialDate: Date;
  finalDate: Date;
}

interface IGenerateReportResponse {
  spendingPdf: Buffer;
}

export class GenerateReportUseCase {
  constructor(private spendingRepository: SpendingRepository) {}

  async execute({
    userId,
    initialDate,
    finalDate,
  }: IGenerateReportRequest): Promise<IGenerateReportResponse> {
    const userSpendingByPeriod =
      await this.spendingRepository.searchSpendingsByPeriod(
        userId,
        initialDate,
        finalDate
      );

    if (userSpendingByPeriod.length < 1) {
      throw new InvalidPeriodByReportError();
    }

    const periodByAddMessage = `${dayjs(initialDate).format(
      "DD/MM/YYYY"
    )} a ${dayjs(finalDate).format("DD/MM/YYYY")}`;

    const bodyByDocumentDefinition = [];

    let total = 0;
    for await (let spending of userSpendingByPeriod) {
      const rows = [];
      const spendingObject = {
        id: spending.id,
        price: `${formatNumberToBRLCoin(spending.price)}`,
        date: `${dayjs(spending.date).format("DD/MM/YYYY")}`,
      };

      total += spending.price;
      bodyByDocumentDefinition.push(spendingObject);
    }

    const buffer = await generatePdfFromHtml({
      spendings: bodyByDocumentDefinition,
      period: periodByAddMessage,
      total: "R$ " + total.toFixed(2),
    });

    return {
      spendingPdf: buffer,
    };
  }
}
