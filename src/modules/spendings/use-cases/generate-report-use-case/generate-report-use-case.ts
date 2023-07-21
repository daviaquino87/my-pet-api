import dayjs from "dayjs";
import ejs from "ejs";
import path from "path";

import { generatePdfUsingGotenberg } from "@/lib/pdf/gotenberg";
import { streamToBuffer } from "@/lib/pdf/utils/transform-stream-to-buffer";
import { InvalidPeriodByReportError } from "@/modules/spendings/errors/Invalid-period-by-report-error";
import { SpendingRepository } from "@/modules/spendings/repositories/spendings-repository";
import { formatNumberToBRLCoin } from "@/utils/format-number-to-BRL-coin";

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
    for await (const spending of userSpendingByPeriod) {
      const spendingObject = {
        id: spending.id,
        price: `${formatNumberToBRLCoin(spending.price)}`,
        date: `${dayjs(spending.date).format("DD/MM/YYYY")}`,
      };

      total += spending.price;
      bodyByDocumentDefinition.push(spendingObject);
    }

    const templatePath = path.resolve(
      __dirname,
      "../../../../lib/pdf/templates/financial-pdf.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      spendings: bodyByDocumentDefinition,
      period: periodByAddMessage,
      total: "R$ " + total.toFixed(2),
    });

    const stream = await generatePdfUsingGotenberg({
      html,
    });

    const buffer = await streamToBuffer(stream.data);

    return {
      spendingPdf: buffer,
    };
  }
}
