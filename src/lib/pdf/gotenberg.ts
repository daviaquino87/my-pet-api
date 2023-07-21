import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { Stream } from "stream";

import { FailedToGenerateHtmlError } from "../errors/failed-to-generate-html-error";

interface IGeneratePdf {
  html: any;
}

export async function generatePdfUsingGotenberg({
  html,
}: IGeneratePdf): Promise<AxiosResponse<Stream, any>> {
  const gotenbergUrl = "http://gotenberg:3000";
  const formData = new FormData();

  try {
    const buffer = Buffer.from(html, "utf8");

    formData.append("files", buffer, {
      filename: "index.html",
    });

    // A4 - 8.27 X 11.7
    formData.append("paperWidth", "8.27");
    formData.append("paperHeight", "11.7");
    formData.append("marginBottom", "1");

    return axios.post<Stream>("forms/chromium/convert/html", formData, {
      baseURL: gotenbergUrl,
      responseType: "stream",
    });
  } catch (error) {
    console.log(error);
    throw new FailedToGenerateHtmlError();
  }
}
