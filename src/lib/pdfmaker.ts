import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

export async function generatePdf(
  documentDefinition: TDocumentDefinitions
): Promise<Buffer> {
  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(documentDefinition);

  const buffers: Buffer[] = [];

  pdfDoc.on("data", (buffer) => {
    buffers.push(buffer);
  });

  pdfDoc.end();

  return new Promise<Buffer>((resolve) => {
    pdfDoc.on("end", () => {
      const result = Buffer.concat(buffers);
      resolve(result);
    });
  });
}
