import { SpendingRepository } from "../../repositories/spendings-repository";
import { generatePdf } from "@/lib/pdfmaker";
import { TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import dayjs from "dayjs";

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

    const periodByAddMessage = `${dayjs(initialDate).format(
      "DD/MM/YYYY"
    )} a ${dayjs(finalDate).format("DD/MM/YYYY")}`;

    const bodyByDocumentDefinition = [];

    let total = 0;
    for await (let spending of userSpendingByPeriod) {
      const rows = [];
      rows.push(spending.id);
      rows.push(`R$ ${spending.price}`);
      rows.push(`${dayjs(spending.date).format("DD/MM/YYYY")}`);

      total += spending.price;
      bodyByDocumentDefinition.push(rows);
    }

    const documentDefinition: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          columns: [
            { text: "MyPet", style: "header" },
            { text: `${periodByAddMessage}.` },
          ],
        },
        {
          style: "Compras",
          table: {
            widths: ["*", 80, "auto"],
            body: [
              [
                { text: "Id", style: "columTitle" },
                { text: "Preço", style: "columTitle" },
                { text: "Data da compra", style: "columTitle" },
              ],
              ...bodyByDocumentDefinition,
            ],
          },
        },
        {
          columns: [{ text: `total: ${total}`, style: "total" }],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        Compras: {
          fontSize: 12,
          margin: [0, 5, 0, 15],
        },
        columTitle: {
          fontSize: 15,
          bold: true,
          color: "white",
          fillColor: "orange",
          alignment: "center",
        },
        columItemCenter: {
          alignment: "center",
        },
        total: {
          fontSize: 16,
          italics: true,
          bold: true,
        },
      },
    };

    const buffer = await generatePdf(documentDefinition);

    return {
      spendingPdf: buffer,
    };
  }
}
