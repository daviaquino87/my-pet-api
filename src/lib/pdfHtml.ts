import path from "node:path";

import ejs from "ejs";
import puppeteer from "puppeteer";

import { FailedToGenerateHtmlError } from "./errors/failed-to-generate-html-error";

interface IGeneratePdf {
  total: string;
  period: string;
  spendings: any;
}

export async function generatePdfFromHtml({
  total,
  period,
  spendings,
}: IGeneratePdf): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const templatePath = path.resolve(
    __dirname,
    "../utils/templates/financial-pdf.ejs"
  );

  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const html = await ejs.renderFile(templatePath, {
        total,
        period,
        spendings,
      });

      await page.setContent(html);

      await page.setViewport({
        width: 400,
        height: 1000,
      });

      const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "10px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
      });

      resolve(buffer);
    } catch (error) {
      console.log(error);
      reject(new FailedToGenerateHtmlError());
    }finally {
      await browser.close();
    }
  });
}
